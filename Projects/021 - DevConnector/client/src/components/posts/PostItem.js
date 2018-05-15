import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addLike, removeLike, deletePost } from '../../actions/postActions';

class PostItem extends Component {
    onDeleteClick = id => {
        this.props.deletePost(id);
    };

    onLikeClick = id => {
        this.props.addLike(id);
    };

    onUnlikeClick = id => {
        this.props.removeLike(id);
    };

    findUserLike = likes => {
        const { auth } = this.props;
        if (likes.find(like => like.user === auth.user.id)) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        const { post, auth, showActions } = this.props;
        const { name, avatar, text, likes, user, _id } = post;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={avatar}
                                alt={name}
                            />
                        </a>
                        <br />
                        <p className="text-center">{name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{text}</p>
                        {showActions ? (
                            <span>
                                <button
                                    onClick={() => this.onLikeClick(_id)}
                                    type="button"
                                    className="btn btn-light mr-1"
                                >
                                    <i
                                        className={classnames(
                                            'fas fa-thumbs-up',
                                            {
                                                'text-info': this.findUserLike(
                                                    likes
                                                )
                                            }
                                        )}
                                    />
                                    <span className="badge badge-light">
                                        {likes.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => this.onUnlikeClick(_id)}
                                    type="button"
                                    className="btn btn-light mr-1"
                                >
                                    <i className="text-secondary fas fa-thumbs-down" />
                                </button>
                                <Link
                                    to={`/post/${_id}`}
                                    className="btn btn-info mr-1"
                                >
                                    Comments
                                </Link>
                                {user === auth.user.id ? (
                                    <button
                                        onClick={() => this.onDeleteClick(_id)}
                                        type="button"
                                        className="btn btn-danger mr-1"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                ) : null}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
};

PostItem.defaultProps = {
    showActions: true
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
    PostItem
);
