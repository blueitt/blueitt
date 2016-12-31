import React, { Component, PropTypes } from 'react';

import SubmissionListItem from 'components/SubmissionListItem';

export default class Subreddit extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onFetchSubmissions: PropTypes.func.isRequired,
        submissions: PropTypes.array,
    }

    componentWillMount() {
        this.props.onFetchSubmissions(this.props.params.subreddit);
    }

    render() {
        return (
            <span>
                <h2>/r/something</h2>
                <div>
                    {this.props.isLoading ? 'loading...' : 'not loading.'}
                </div>

                {this.props.submissions === null ? null : this.renderSubmissions()}
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
