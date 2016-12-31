import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SubmissionListItem extends Component {
    static propTypes = {
        submission: PropTypes.object.isRequired,
    };

    render() {
        const submission = this.props.submission;

        return (
            <div>
                <Link to={`/r/${submission.subreddit}/comments/${submission.id}`}>
                    {submission.title}
                </Link>
            </div>
        );
    }
}
