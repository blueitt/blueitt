import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fontawesome';

export default class SubmissionListItem extends Component {
    static propTypes = {
        submission: PropTypes.object.isRequired,
    };

    hasThumbnail() {
        return this.getThumbnailUrl() !== null;
    }

    getThumbnailUrl() {
        const preview = this.props.submission.preview;

        if (preview !== undefined) {
            return `https://i.redditmedia.com/${preview[0]}`;
        }

        return null;
    }

    render() {
        return (
            <div className="SubmissionListItem">
                <div className="d-flex">
                    <div>
                        {this.renderSummary()}
                        {this.renderTitle()}
                    </div>


                    <div className="ml-auto">
                        {this.hasThumbnail() ? this.renderThumbnail() : null}
                    </div>
                </div>

                {this.renderActionsRow()}
            </div>
        );
    }

    renderSummary() {
        return (
            <div className="SubmissionListItem-summary">
                <span className="SubmissionListItem-author">
                    /u/
                    <Link to={`/u/${this.props.submission.author}`}>
                        {this.props.submission.author}
                    </Link>
                </span>

                &bull;

                <span className="SubmissionListItem-subreddit">
                    /r/
                    <Link to={`/r/${this.props.submission.subreddit}`}>
                        {this.props.submission.subreddit}
                    </Link>
                </span>

                &bull;

                <span className="SubmissionListItem-domain">
                    {this.props.submission.domain}
                </span>

                <span className="SubmissionListItem-createdAt">
                    (4 hours ago)
                </span>
            </div>
        );
    }

    renderTitle() {
        return (
            <div className="SubmissionListItem-title">
                <a className="SubmissionListItem-titleLink" href={this.props.submission.url}>
                    {this.props.submission.title}
                </a>
            </div>
        );
    }

    renderThumbnail() {
        const style = {
            backgroundImage: `url('${this.props.submission.thumbnail}')`,
        };

        return (
            <div className="SubmissionListItem-thumbnail rounded" style={style} />
        );
    }

    renderActionsRow() {
        return (
            <div className="row">
                <div className="SubmissionListItem-actionRowItem col">
                    <Icon name="arrow-circle-o-up" />

                    <span className="SubmissionListItem-score">
                        {this.props.submission.score}
                    </span>

                    <Icon name="arrow-circle-o-down" />
                </div>

                <div className="SubmissionListItem-actionRowItem col">
                    <span className="SubmissionListItem-numComments">
                        {this.props.submission.num_comments}
                    </span>

                    <Icon name="comment" />
                </div>

                <div className="SubmissionListItem-actionRowItem col">
                    etc
                </div>
            </div>
        );
    }
}
