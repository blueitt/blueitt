import React, { Component, PropTypes } from 'react';

import FRONT_PAGE from 'constants/frontPage';

import SubmissionListItem from 'components/SubmissionListItem';

export default class FrontPage extends Component {
    static propTypes = {
        isLoadingFirstSubmissions: PropTypes.bool.isRequired,
        isLoadingMoreSubmissions: PropTypes.bool.isRequired,
        onFetchMoreSubmissions: PropTypes.func.isRequired,
        onFetchSubreddit: PropTypes.func.isRequired,
        submissions: PropTypes.array,
        subredditOrder: PropTypes.string.isRequired,
    };

    loadMoreSubmissions() {
        this.props.onFetchMoreSubmissions(FRONT_PAGE, this.props.subredditOrder);
    }

    componentWillMount() {
        this.props.onFetchSubreddit(FRONT_PAGE, this.props.subredditOrder);
    }

    render() {
        return (
            <div>
                <div>Front page!</div>

                <div>
                    {this.props.isLoadingFirstSubmissions ? 'loading...' : null}
                </div>

                {this.props.submissions !== null ? this.renderSubmissions() : null}
            </div>
        );
    }

    renderSubmissions() {
        const submissions = this.props.submissions.map((submission) => {
            return (
                <SubmissionListItem
                    key={submission.submission.id}
                    submission={submission.submission}
                />
            );
        });

        return (
            <div>
                {submissions}

                {this.props.isLoadingMoreSubmissions ? 'loading more' : null }
                <button onClick={() => this.loadMoreSubmissions()}>
                    Load more posts
                </button>
            </div>
        );
    }
}
