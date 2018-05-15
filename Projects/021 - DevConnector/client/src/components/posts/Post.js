import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

import { getPost } from '../../actions/postActions';

class Post extends Component {
    componentDidMount = () => {
        this.props.getPost(this.props.match.params.id);
    };

    render() {
        const { post, loading } = this.props.post;
        const { _id, comments } = post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />;
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={_id} />
                    <CommentFeed postId={_id} comments={comments} />
                </div>
            );
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back to Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
