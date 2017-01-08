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

//             const rootComments = commentsListing.data.children;
//
//             const flattenedComments = rootComments.length === 0
//                 ? {}
//                 : rootComments.slice(0, -1).map(c => flattenCommentsTree(c.data));
//
//             return {
//                 submission: addSubmissionComments(submission, rootComments),
//                 commentsById: Object.assign({}, ...flattenedComments),
//             };
//
// function flattenCommentsListing(listing) {
//     const [hasMore, { moreCommentsCount, moreCommentsIds }] = hasMoreComments(listing);
//
//     const actualComments = hasMore
//         ? listing.data.children
//         : listing.data.children.slice(0, -1);
//     const rootCommentIds = actualComments.map(c => c.data.id);
//
//     const moreCommentsCount = hasMore
//         ?
//
//     return {
//         comments,
//         rootCommentIds,
//         isContinueThisThread,
//         hasMore,
//         moreCommentsCount,
//         moreCommentsIds,
//     }
// }
//
// function hasMoreComments(listing) {
//     const comments = listing.data.children;
//     const lastComment = comments[comments.length - 1];
//
// }
//
// function hasMore(comments) {
//
//     return lastComment.type === 'more';
// }
//
// function addSubmissionComments(submission, rootComments) {
//     if (rootComments.length === 0) {
//         // There are no comments on this submission
//         return {
//             submission,
//             commentIds: [],
//             hasMoreComments: false,
//             moreCommentsIds: null,
//             moreCommentsCount: null,
//         };
//     }
//
//     const lastComment = rootComments[rootComments.length - 1];
//     if (lastComment.kind === 't1') {
//         // There is no "more comments" to be loaded
//         return {
//             submission,
//             commentIds: rootComments.map(c => c.data.id),
//             hasMoreComments: false,
//             moreCommentsIds: null,
//             moreCommentsCount: null,
//         };
//     }
//
//     return {
//         submission,
//         commentIds: rootComments.slice(0, -1).map(c => c.data.id),
//         hasMoreComments: true,
//         moreCommentsIds: lastComment.data.children,
//         moreCommentsCount: lastComment.data.count,
//     };
// }
//
// function flattenSubmissionComments(rootComments) {
//     if (rootComments.length === 0) {
//         return [];
//     }
//
//     const actualComments =
//
//     if (hasLoadMoreComments(rootComments)) {
//
//     }
// }
//
// function flattenCommentsTree(comment) {
//     const commentWithMetadata = addCommentMetadata(comment);
//
//     if (!hasAnyReplies(comment)) {
//         return [commentWithMetadata];
//     }
//
//     const replies = getActualReplies(comment).map(c => flattenCommentsTree(c));
//     return [commentWithMetadata, ...replies];
// }
//
// function addCommentMetadata(comment) {
//     const { replies: repliesListing, ...withoutReplies } = comment;
//
//     if (!hasAnyReplies(comment)) {
//         return {
//             comment: withoutReplies,
//             replyIds: [],
//             hasMoreReplies: false,
//             hasContinueThisThread: false,
//             moreRepliesIds: null,
//             moreRepliesCount: null,
//         };
//     }
//
//     const replies = repliesListing.data.children;
//     if (!hasLoadMoreComments(comment)) {
//         return {
//             comment: withoutReplies,
//             replyIds: replies.map(c => c.data.id),
//             hasMoreReplies: false,
//             hasContinueThisThread: hasContinueThisThread(comment),
//             moreRepliesIds: null,
//             moreRepliesCount: null,
//         };
//     }
//
//     const lastReply = replies[replies.length - 1];
//     return {
//         comment: withoutReplies,
//         replyIds: replies.slice(0, -1).map(c => c.data.id),
//         hasMoreReplies: true,
//         hasContinueThisThread: hasContinueThisThread(comment),
//         moreRepliesIds: lastReply.data.children,
//         moreCommentsCount: lastReply.data.count,
//     };
// }
//
// function hasAnyReplies(comment) {
//     return comment.replies !== "";
// }
//
// function getActualReplies(comment) {
//     const replies = comment.replies.data.children;
//     return hasLoadMoreComments(comment) ? replies.slice(0, -1) : replies;
// }
//
// function hasLoadMoreComments(comment) {
//     const replies = comment.replies.data.children;
//     const lastReply = replies[replies.length - 1];
//
//     return lastReply.kind === 'more';
// }
//
// function hasContinueThisThread(comment) {
//     const replies = comment.replies.data.children;
//     if (replies.length !== 1) {
//         return false;
//     }
//
//     const reply = replies[0];
//     return reply.kind === 'more' && reply.data.id === '_';
// }
