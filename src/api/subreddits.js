export function getFrontPageSubmissions(reddit, order, nextSubmissionName) {
    return getSubmissions(reddit, '', order, nextSubmissionName);
}

export function getSubredditSubmissions(reddit, subreddit, order, nextSubmissionName) {
    return getSubmissions(reddit, `/r/${subreddit}`, order, nextSubmissionName);
}

function getSubmissions(reddit, subredditPrefix, order, nextSubmissionName) {
    const options = {
        hot: [reddit(`${subredditPrefix}/hot`), {}],
        new: [reddit(`${subredditPrefix}/new`), {}],
        rising: [reddit(`${subredditPrefix}/rising`), {}],
        topAll: [reddit(`${subredditPrefix}/top`), { t: 'all' }],
        topYear: [reddit(`${subredditPrefix}/top`), { t: 'year' }],
        topMonth: [reddit(`${subredditPrefix}/top`), { t: 'month' }],
        topWeek: [reddit(`${subredditPrefix}/top`), { t: 'week' }],
        topDay: [reddit(`${subredditPrefix}/top`), { t: 'day' }],
        topHour: [reddit(`${subredditPrefix}/top`), { t: 'hour' }],
        controversialAll: [reddit(`${subredditPrefix}/controversial`), { t: 'all' }],
        controversialYear: [reddit(`${subredditPrefix}/controversial`), { t: 'year' }],
        controversialMonth: [reddit(`${subredditPrefix}/controversial`), { t: 'month' }],
        controversialWeek: [reddit(`${subredditPrefix}/controversial`), { t: 'week' }],
        controversialDay: [reddit(`${subredditPrefix}/controversial`), { t: 'day' }],
        controversialHour: [reddit(`${subredditPrefix}/controversial`), { t: 'hour' }],
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
