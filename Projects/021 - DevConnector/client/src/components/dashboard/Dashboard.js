import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.getCurrentProfile();
    };

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = <h4>Display profile</h4>;
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-mutted">Welcome {user.name}</p>
                        <p>
                            You have not setup a profile, please add some info
                        </p>
                        <Link
                            to="/create-profile"
                            className="btn btn-lg btn-info"
                        >
                            Create profile
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
