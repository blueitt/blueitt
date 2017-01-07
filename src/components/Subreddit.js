import React, { Component, PropTypes } from 'react';

import SubmissionListItem from 'components/SubmissionListItem';

export default class Subreddit extends Component {
    static propTypes = {
        subredditName: PropTypes.string.isRequired,
        subredditOrder: PropTypes.string.isRequired,
        isLoadingFirst: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        onFetchSubreddit: PropTypes.func.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        submissionIds: PropTypes.array,
        submissionsById: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.props.onFetchSubreddit(this.props.subredditName, this.props.subredditOrder);
    }

    fetchMoreSubmissions() {
        this.props.onFetchMoreSubmissions(this.props.subredditName, this.props.subredditOrder);
    }

    render() {
        return (
            <span>
                <h2>/r/{this.props.subredditName}</h2>
                <div>
                    {this.props.isLoadingFirst ? 'loading...' : 'not loading.'}
                </div>

                {this.props.submissionIds === null ? null : this.renderSubmissions()}

                <div>
                    {this.props.isLoadingMore ? 'loading more ...' : 'not loading more.'}
                </div>

                <div onClick={() => this.fetchMoreSubmissions()}>
                    Click more to load more!
                </div>
            </span>
        );
    }

    renderSubmissions() {
        const submissions = this.props.submissionIds.map((submissionId, i) => {
            const submission = this.props.submissionsById[submissionId].submission;
            return <SubmissionListItem key={i} submission={submission} />;
        });

        return (
            <div>
                {submissions}
            </div>
        );
    }
}
