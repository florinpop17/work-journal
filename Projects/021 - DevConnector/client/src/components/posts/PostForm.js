import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
    state = {
        text: '',
        errors: []
    };

    onSubmit = e => {
        e.preventDefault();
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { text, errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Somthing...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    className="form-control form-control-lg"
                                    placeholder="Create a post"
                                    name="text"
                                    value={text}
                                    onChange={this.onChange}
                                    errors={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);
