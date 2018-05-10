import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    componentWillReceiveProps = nextProps => {
        const { errors } = nextProps;

        if (errors) {
            this.setState({
                errors
            });
        }
    };

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, email, password, password2 } = this.state;
        const newUser = { name, email, password, password2 };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { name, email, password, password2, errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a
                                    profile image, use a Gravatar email"
                                />
                                <TextFieldGroup
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
