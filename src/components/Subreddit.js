import React, { Component, PropTypes } from 'react';

import SubmissionListItem from 'components/SubmissionListItem';

export default class Subreddit extends Component {
    static propTypes = {
        subredditName: PropTypes.string.isRequired,
        subredditOrder: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        onFetchSubmissions: PropTypes.func.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        submissions: PropTypes.array,
    }

    componentWillMount() {
        this.props.onFetchSubmissions(this.props.subredditName, this.props.subredditOrder);
    }

    fetchMoreSubmissions() {
        this.props.onFetchMoreSubmissions(this.props.subredditName, this.props.subredditOrder);
    }

    render() {
        return (
            <span>
                <h2>/r/something</h2>
                <div>
                    {this.props.isLoading ? 'loading...' : 'not loading.'}
                </div>

                {this.props.submissions === null ? null : this.renderSubmissions()}

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
        const submissions = this.props.submissions.map((submission, i) => {
            return <SubmissionListItem key={i} submission={submission} />;
        });

        return (
            <div>
                {submissions}
            </div>
        );
    }
}
