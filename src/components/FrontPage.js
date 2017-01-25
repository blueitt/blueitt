import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'reactstrap';
import Waypoint from 'react-waypoint';
import Icon from 'react-fontawesome';

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

    constructor(props) {
        super(props);

        this.fetchMoreSubmissions = () => {
            this.props.onFetchMoreSubmissions(FRONT_PAGE, this.props.subredditOrder);
        };
    }

    loadMoreSubmissions() {
        this.props.onFetchMoreSubmissions(FRONT_PAGE, this.props.subredditOrder);
    }

    componentWillMount() {
        this.props.onFetchSubreddit(FRONT_PAGE, this.props.subredditOrder);
    }

    render() {
        return (
            <div className="FrontPage">
                <Row className="FrontPage-row">
                    <Col className="FrontPage-col" xs="12" md="3">
                        sidebar goes here
                    </Col>

                    <Col className="FrontPage-col" xs="12" md="9">
                        {this.renderSubmissions()}
                    </Col>
                </Row>
            </div>
        );
    }

    renderSubmissions() {
        return (
            <div className="FrontPage-submissions">
                {this.props.submissions === null ? null : this.renderSubmissionListItems()}
                {/* {this.props.isLoadingFirstSubmissions ? null : this.renderBottom()} */}
            </div>
        );
    }

    renderSubmissionListItems() {
        return this.props.submissions.map((submission) => {
            return (
                <SubmissionListItem
                    key={submission.submission.id}
                    submission={submission.submission}
                />
            );
        });
    }

    renderBottom() {
        return this.props.isLoadingMoreSubmissions
            ? this.renderIsLoadingMoreSubmissions()
            : this.renderLoadMoreSubmissions();
    }

    renderIsLoadingMoreSubmissions() {
        return (
            <div className="FrontPage-isLoadingMoreWrapper">
                <div className="FrontPage-isLoadingMore">
                    <Icon name="refresh" className="FrontPage-isLoadingMoreSpinner" spin />

                    Loading more ...
                </div>
            </div>
        );
    }

    renderLoadMoreSubmissions() {
        return (
            <div>
                <div className="FrontPage-loadMoreWrapper">
                    <div className="FrontPage-loadMore">
                        Keep scrolling down to load more
                    </div>
                </div>

                <Waypoint onEnter={this.fetchMoreSubmissions} />

                <div className="FrontPage-waypointBuffer" />
            </div>
        );
    }
}
