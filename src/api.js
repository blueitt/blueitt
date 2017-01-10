import Snoocore from 'snoocore';

function getSnoocore() {
    return new Snoocore({
        userAgent: 'Blueitt v0.0.1',
        oauth: {
            type: 'implicit',
            key: 'wxaZ11pMAfDtLw',
            redirectUri: 'http://127.0.0.1:3000/authenticate',
            scope: ['read', 'identity'],
        },
    });
}

export function getAuthUrl(authState) {
    return getSnoocore().getAuthUrl(authState);
}

export function getSubredditSubmissions(token, subreddit, order, nextSubmissionName) {
    const reddit = getSnoocore();

    const options = {
        hot: [reddit(`/r/${subreddit}/hot`), {}],
        new: [reddit(`/r/${subreddit}/new`), {}],
        rising: [reddit(`/r/${subreddit}/rising`), {}],
        topAll: [reddit(`/r/${subreddit}/top`), { t: 'all' }],
        topYear: [reddit(`/r/${subreddit}/top`), { t: 'year' }],
        topMonth: [reddit(`/r/${subreddit}/top`), { t: 'month' }],
        topWeek: [reddit(`/r/${subreddit}/top`), { t: 'week' }],
        topDay: [reddit(`/r/${subreddit}/top`), { t: 'day' }],
        topHour: [reddit(`/r/${subreddit}/top`), { t: 'hour' }],
        controversialAll: [reddit(`/r/${subreddit}/controversial`), { t: 'all' }],
        controversialYear: [reddit(`/r/${subreddit}/controversial`), { t: 'year' }],
        controversialMonth: [reddit(`/r/${subreddit}/controversial`), { t: 'month' }],
        controversialWeek: [reddit(`/r/${subreddit}/controversial`), { t: 'week' }],
        controversialDay: [reddit(`/r/${subreddit}/controversial`), { t: 'day' }],
        controversialHour: [reddit(`/r/${subreddit}/controversial`), { t: 'hour' }],
    };

    return reddit.auth(token)
        .then(() => {
            const [request, params] = options[order];

            return request.get({
                ...params,
                raw_json: 1,
                after: nextSubmissionName,
            });
        });
}

export function getSubmission(token, submissionId) {
    const reddit = getSnoocore();

    return reddit.auth(token)
        .then(() => {
            return reddit(`/comments/${submissionId}`).get({ raw_json: 1 });
        }).then(([submissionListing, commentsListing]) => {
            const submission = submissionListing.data.children[0].data;
            const commentObjects = flattenCommentsTree(commentsListing);

            const result = getNewComments(`t3_${submission.id}`, commentObjects);

            return {
                submission: {
                    submission,
                    commentIds: result.rootCommentIds,
                    hasMoreComments: result.rootHasMoreComments,
                    moreCommentsCount: result.rootMoreCommentsCount,
                    moreCommentsIds: result.rootMoreCommentsIds,
                },
                comments: result.comments,
            };
        });
}

function flattenCommentsTree(commentsListing) {
    let result = [];

    commentsListing.data.children.forEach((commentObject) => {
        result = [...result, commentObject];

        if (commentObject.kind === 't1' && commentObject.data.replies !== '') {
            result = [...result, ...flattenCommentsTree(commentObject.data.replies)];
        }
    });

    return result;
}

export function getMoreComments(token, submissionId, fetchRootComments, parentCommentId, commentsToExpand) {
    const reddit = getSnoocore();
    const submissionName = `t3_${submissionId}`;

    return reddit.auth(token)
        .then(() => {
            return reddit('/api/morechildren').post({
                link_id: submissionName,
                children: commentsToExpand.join(','),
            });
        }).then((response) => {
            const commentObjects = response.json.data.things;
            const rootParentName = fetchRootComments
                ? submissionName
                : `t1_${parentCommentId}`;

            return getNewComments(rootParentName, commentObjects);
        });
}

function getNewComments(rootParentName, commentObjects) {
    const comments = commentObjects
        .filter(c => c.kind === 't1')
        .map((commentObject) => {
            // eslint-disable-next-line no-unused-vars
            const { replies, ...commentWithoutReplies } = commentObject.data;

            return {
                comment: commentWithoutReplies,
                hasContinueThisThread: false,
                hasMoreReplies: false,
                moreRepliesCount: null,
                moreRepliesIds: null,
                replyIds: [],
            };
        });

    const commentsByName = Object.assign(
        {},
        ...comments.map(c => ({ [`t1_${c.comment.id}`]: c })),
    );

    const rootCommentIds = [];
    let rootHasContinueThisThread = false;
    let rootHasMoreComments = false;
    let rootMoreCommentsCount = null;
    let rootMoreCommentsIds = null;

    commentObjects.forEach((commentObject) => {
        const parentName = commentObject.data.parent_id;

        if (commentObject.kind === 't1') {
            // an actual comment
            if (parentName === rootParentName) {
                rootCommentIds.push(commentObject.data.id);
            } else {
                commentsByName[parentName].replyIds.push(commentObject.data.id);
            }
        } else if (isContinueThisThread(commentObject)) {
            // a continue-this-thread comment
            if (parentName === rootParentName) {
                rootHasContinueThisThread = true;
            } else {
                commentsByName[parentName].hasContinueThisThread = true;
            }
        } else {
            // a load-more-comments comment
            // eslint-disable-next-line no-lonely-if
            if (parentName === rootParentName) {
                rootHasMoreComments = true;
                rootMoreCommentsCount = commentObject.data.count;
                rootMoreCommentsIds = commentObject.data.children;
            } else {
                commentsByName[parentName].hasMoreReplies = true;
                commentsByName[parentName].moreRepliesCount = commentObject.data.count;
                commentsByName[parentName].moreRepliesIds = commentObject.data.children;
            }
        }
    });

    return {
        rootCommentIds,
        rootHasContinueThisThread,
        rootHasMoreComments,
        rootMoreCommentsCount,
        rootMoreCommentsIds,
        comments,
    };
}

function isContinueThisThread(commentObject) {
    return commentObject.kind === 'more' && commentObject.data.id === '_';
}
