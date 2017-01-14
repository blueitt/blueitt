import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fontawesome';
import { Badge, Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SubmissionListItem extends Component {
    static propTypes = {
        submission: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
        };
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    hasThumbnail() {
        return this.getThumbnailUrl() !== null;
    }

    getThumbnailUrl() {
        const thumbnail = this.props.submission.thumbnail;

        if (thumbnail === 'self' || thumbnail === 'default' || thumbnail === 'nsfw') {
            return null;
        }

        return thumbnail;
    }

    render() {
        return (
            <div className="SubmissionListItem">
                <div className="SubmissionListItem-contentArea">
                    <div className="d-flex">
                        <div className="SubmissionListItem-leftContent">
                            {this.renderSummary()}
                            {this.renderTitle()}
                        </div>


                        <div className="ml-auto">
                            {this.hasThumbnail() ? this.renderThumbnail() : null}
                        </div>
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

                {this.props.submission.link_flair_text === '' ? null : this.renderFlair()}
                {this.props.submission.over_18 ? this.renderNsfw() : null}
            </div>
        );
    }

    renderFlair() {
        return (
            <Badge className="SubmissionListItem-flair">
                {this.props.submission.link_flair_text}
            </Badge>
        );
    }

    // eslint-disable-next-line class-methods-use-this
    renderNsfw() {
        return (
            <Badge className="SubmissionListItem-nsfw" color="danger">
                NSFW
            </Badge>
        );
    }

    renderThumbnail() {
        const style = {
            backgroundImage: `url('${this.getThumbnailUrl()}')`,
        };

        return (
            <div className="SubmissionListItem-thumbnail rounded" style={style} />
        );
    }

    renderActionsRow() {
        return (
            <div className="SubmissionListItem-actionRow row">
                <div className="SubmissionListItem-actionRowItem col">
                    <Icon className="SubmissionListItem-voteUp" name="arrow-circle-o-up" />

                    <span className="SubmissionListItem-score">
                        {this.props.submission.score}
                    </span>

                    <Icon className="SubmissionListItem-voteDown" name="arrow-circle-o-down" />
                </div>

                <Link
                    to={`/r/${this.props.submission.subreddit}/comments/${this.props.submission.id}`}
                    className="SubmissionListItem-actionRowItem col"
                >
                    <span className="SubmissionListItem-numComments">
                        {this.props.submission.num_comments}
                    </span>

                    <Icon name="comment" />
                </Link>

                <div className="SubmissionListItem-actionRowItem col">
                    <Icon name="bookmark" />

                    <span className="SubmissionListItem-save">
                        Save
                    </span>
                </div>

                {this.renderMoreActionsDropdown()}
            </div>
        );
    }

    renderMoreActionsDropdown() {
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                className="SubmissionListItem-actionRowItem col"
                onClick={() => this.toggleDropdown()}
                data-toggle="dropdown"
            >
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropdown()}>
                    <div>
                        <Icon name="ellipsis-h" />

                        <span className="SubmissionListItem-moreActions">
                            More
                        </span>
                    </div>
                    <DropdownMenu>
                        <DropdownItem className="SubmissionListItem-moreActionsOptionButton">
                            <Icon name="share-alt" fixedWidth />
                            <span className="SubmissionListItem-moreActionsOptionText">
                                Share
                            </span>
                        </DropdownItem>
                        <DropdownItem className="SubmissionListItem-moreActionsOptionButton">
                            <Icon name="flag" fixedWidth />
                            <span className="SubmissionListItem-moreActionsOptionText">
                                Report
                            </span>
                        </DropdownItem>
                        <DropdownItem className="SubmissionListItem-moreActionsOptionButton">
                            <Icon name="ban" fixedWidth />
                            <span className="SubmissionListItem-moreActionsOptionText">
                                Hide
                            </span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

        );
    }
}
