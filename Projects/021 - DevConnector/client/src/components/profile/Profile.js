import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';

import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';

import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount = () => {
        const { handle } = this.props.match.params;
        if (handle) {
            this.props.getProfileByHandle(handle);
        }
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    };

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link
                                to="/profiles"
                                className="btn btn-light mb-3 float-left"
                            >
                                Back to profiles{' '}
                            </Link>
                        </div>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />
                    {profile.githubusername ? (
                        <ProfileGithub username={profile.githubusername} />
                    ) : null}
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
