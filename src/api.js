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
            const rawSubmission = submissionListing.data.children[0].data;

            return flattenSubmissionComments(rawSubmission, commentsListing);
        });
}

function flattenSubmissionComments(submission, commentsListing) {
    const flattenedComments = flattenCommentsListing(commentsListing);

    return {
        submission: {
            commentIds: flattenedComments.rootCommentIds,
            hasMoreComments: flattenedComments.hasMoreComments,
            moreCommentsCount: flattenedComments.moreCommentsCount,
            moreCommentsIds: flattenedComments.moreCommentsIds,
            submission,
        },
        comments: flattenedComments.comments,
    };
}

function flattenCommentsListing(listing) {
    if (listing === '') {
        // comments without any replies have empty string as their replies
        return {
            comments: [],
            hasMoreComments: false,
            isContinueThisThread: false,
            moreCommentsCount: null,
            moreCommentsIds: null,
            rootCommentIds: [],
        };
    }

    const allComments = listing.data.children;
    if (allComments.length === 0) {
        // listing may have zero children (a submission with no comments)
        return {
            comments: [],
            hasMoreComments: false,
            isContinueThisThread: false,
            moreCommentsCount: null,
            moreCommentsIds: null,
            rootCommentIds: [],
        };
    }

    const lastComment = allComments[allComments.length - 1];
    if (isContinueThisThread(lastComment)) {
        // this listing must be of length one, and the only "comment" is a link
        // to "continue this thread" because the reply chain got too deep
        return {
            comments: [],
            hasMoreComments: false,
            isContinueThisThread: true,
            moreCommentsCount: null,
            moreCommentsIds: null,
            rootCommentIds: [],
        };
    }

    const { hasMoreComments, moreCommentsCount, moreCommentsIds } = getMoreCommentsData(lastComment);
    // if (hasMoreComments) {
    //     console.log(lastComment);
    // }

    const actualComments = hasMoreComments
        ? allComments.slice(0, -1) // exclude the last "comment"
        : allComments;

    const rootCommentIds = actualComments.map(c => c.data.id);

    let comments = [];
    for (const commentObject of actualComments) {
        const comment = commentObject.data;
        const { replies, ...commentWithoutReplies } = comment;
        const flattenedReplies = flattenCommentsListing(replies);

        const commentWithMetadata = {
            comment: commentWithoutReplies,
            hasContinueThisThread: flattenedReplies.isContinueThisThread,
            hasMoreReplies: flattenedReplies.hasMoreComments,
            moreRepliesCount: flattenedReplies.moreCommentsCount,
            moreRepliesIds: flattenedReplies.moreCommentsIds,
            replyIds: flattenedReplies.rootCommentIds,
        };

        comments = [...comments, commentWithMetadata, ...flattenedReplies.comments];
    }

    return {
        comments,
        hasMoreComments,
        isContinueThisThread: false,
        moreCommentsCount,
        moreCommentsIds,
        rootCommentIds,
    }
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

// one comment or submission is gonna have more replies and other changes
// a bunch of new comments need to be added to the store

function getNewComments(rootParentName, commentObjects) {
    const comments = commentObjects
        .filter(c => c.kind === 't1')
        .map(commentObject => {
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

    for (const commentObject of commentObjects) {
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
            if (parentName === rootParentName) {
                rootHasMoreComments = true;
                rootMoreCommentsCount = commentObject.data.count;
                rootMoreCommentsIds = commentObject.data.children;
            } else {
                commentsByName[parentName].hasMoreComments = true;
                commentsByName[parentName].moreCommentsCount = commentObject.data.count;
                commentsByName[parentName].moreCommentsIds = commentObject.data.children;
            }
        }
    }

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

function getMoreCommentsData(commentObject) {
    const isMore = commentObject.kind === 'more';
    return {
        hasMoreComments: isMore,
        moreCommentsCount: isMore ? commentObject.data.count : null,
        moreCommentsIds: isMore ? commentObject.data.children : null,
    };
}
