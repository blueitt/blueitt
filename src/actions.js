// import * as api from 'api';
// 
// export const REQUEST_SUBMISSIONS = 'REQUEST_SUBMISSIONS';
// function requestSubmissions(subreddit) {
//     return {
//         type: REQUEST_SUBMISSIONS,
//         subreddit,
//     };
// }
//
// export const RECEIVE_SUBMISSIONS = 'RECEIVE_SUBMISSIONS';
// function receiveSubmissions(subreddit, order, submissions) {
//     return {
//         type: RECEIVE_SUBMISSIONS,
//         subreddit,
//         order,
//         submissions,
//     };
// }
//
// export const REQUEST_MORE_SUBMISSIONS = 'REQUEST_MORE_SUBMISSIONS';
// function requestMoreSubmissions(subreddit) {
//     return {
//         type: REQUEST_MORE_SUBMISSIONS,
//         subreddit,
//     };
// }
//
// export const REQUEST_SUBMISSION = 'REQUEST_SUBMISSION';
// function requestSubmission(submissionId) {
//     return {
//         type: REQUEST_SUBMISSION,
//         submissionId,
//     };
// }
//
// export const RECEIVE_SUBMISSION = 'RECEIVE_SUBMISSION';
// function receiveSubmission(submissionId, submission) {
//     return {
//         type: RECEIVE_SUBMISSION,
//         submissionId,
//         submission,
//     };
// }
//
// export function fetchSubmission(submissionId) {
//     return (dispatch) => {
//         dispatch(requestSubmission(submissionId));
//
//         getRequester().getSubmission(submissionId).fetch()
//             .then(submission => {
//                 dispatch(receiveSubmission(submissionId, submission));
//             });
//     };
// }
//
// export const REQUEST_MORE_COMMENTS = 'REQUEST_MORE_COMMENTS';
// function requestMoreComments(submissionId, parentIsSubmission, parentCommentId) {
//     return {
//         type: REQUEST_MORE_COMMENTS,
//         submissionId,
//         parentIsSubmission,
//         parentCommentId,
//     };
// }
//
// export const RECEIVE_MORE_COMMENTS = 'RECEIVE_MORE_COMMENTS';
// function receiveMoreComments(submissionId, parentIsSubmission, parentCommentId, comments) {
//     return {
//         type: RECEIVE_MORE_COMMENTS,
//         submissionId,
//         parentIsSubmission,
//         parentCommentId,
//         comments,
//     };
// }
//
// export function fetchMoreComments(submissionId, fetchRootComments, parentCommentId) {
//     return (dispatch, getState) => {
//         dispatch(requestMoreComments(submissionId, fetchRootComments, parentCommentId));
//
//         const state = getState();
//         const listing = fetchRootComments
//             ? state.reddit.listings.comments.rootComments[submissionId]
//             : state.reddit.listings.comments.replyComments[parentCommentId];
//
//         listing.fetchMore({ amount: 25 })
//             .then(comments => {
//                 dispatch(receiveMoreComments(submissionId, fetchRootComments, parentCommentId, comments));
//             })
//     }
// }
