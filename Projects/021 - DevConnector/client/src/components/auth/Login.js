import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    componentWillReceiveProps = nextProps => {
        const { auth, errors } = nextProps;

        if (auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

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
        const { email, password } = this.state;
        const user = { email, password };

        this.props.loginUser(user);
    };

    render() {
        const { email, password, errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.onChange}
                                    error={errors.password}
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
