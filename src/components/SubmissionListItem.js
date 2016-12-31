import React, { Component, PropTypes } from 'react';

export default class SubmissionListItem extends Component {
    static propTypes = {
        submission: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div>
                <a href={this.props.submission.url}>{this.props.submission.title}</a>
            </div>
        );
    }
}
