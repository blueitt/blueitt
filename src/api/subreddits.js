// eslint-disable-next-line import/prefer-default-export
export function getSubredditSubmissions(reddit, subreddit, order, nextSubmissionName) {
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

    const [request, params] = options[order];

    return request
        .get({
            ...params,
            raw_json: 1,
            after: nextSubmissionName,
        })
        .then((listing) => {
            return {
                submissions: listing.data.children.map(c => c.data),
                nextSubmissionName: listing.data.after,
            };
        });
}
