import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'reactstrap';

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
                <Row>
                    <Col md="9">
                        {this.renderSubmissions()}
                    </Col>

                    <Col md="3">
                        sidebar goes here
                    </Col>
                </Row>
            </div>
        );
    }

    renderSubmissions() {
        return (
            <div>
                {this.props.submissions === null ? null : this.renderSubmissionListItems()}

                {this.props.isLoadingMoreSubmissions ? 'loading more' : null }
                <button onClick={() => this.loadMoreSubmissions()}>
                    Load more posts
                </button>
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
}
