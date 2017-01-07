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

export function getSubredditSubmissions(token, subreddit, order) {
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
            return request.get(params);
        });
}

// function getSubmissionsForOrder(subreddit, order) {
//     const r = getRequester();
//
//     switch (order) {
//         case 'hot':
//             return r.getHot(subreddit);
//         case 'new':
//             return r.getNew(subreddit);
//         case 'rising':
//             return null;
//         case 'topAll':
//             return r.getTop(subreddit, { time: 'all' });
//         case 'topYear':
//             return r.getTop(subreddit, { time: 'year' });
//         case 'topMonth':
//             return r.getTop(subreddit, { time: 'month' });
//         case 'topWeek':
//             return r.getTop(subreddit, { time: 'week' });
//         case 'topDay':
//             return r.getTop(subreddit, { time: 'day' });
//         case 'topHour':
//             return r.getTop(subreddit, { time: 'hour' });
//         case 'controversialAll':
//             return r.getControversial(subreddit, { time: 'all' });
//         case 'controversialYear':
//             return r.getControversial(subreddit, { time: 'year' });
//         case 'controversialMonth':
//             return r.getControversial(subreddit, { time: 'month' });
//         case 'controversialWeek':
//             return r.getControversial(subreddit, { time: 'week' });
//         case 'controversialDay':
//             return r.getControversial(subreddit, { time: 'day' });
//         case 'controversialHour':
//             return r.getControversial(subreddit, { time: 'hour' });
//     }
// }
