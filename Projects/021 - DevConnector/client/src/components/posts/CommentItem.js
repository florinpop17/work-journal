import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
    onDeleteClick = (postId, commentId) => {
        this.props.deleteComment(postId, commentId);
    };

    render() {
        const { comment, postId, auth } = this.props;
        const { avatar, name, text, user, _id } = comment;

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
                        {user === auth.user.id ? (
                            <button
                                onClick={() => this.onDeleteClick(postId, _id)}
                                type="button"
                                className="btn btn-danger mr-1"
                            >
                                <i className="fas fa-times" />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
