import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    };

    onSubmit = e => {
        e.preventDefault();
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            displaySocialInputs,
            handle,
            status,
            company,
            website,
            location,
            skills,
            githubusername,
            bio,
            errors
        } = this.state;

        // Select options for status
        const options = [
            {
                label: 'Select Professional Status',
                value: 0
            },
            {
                label: 'Developer',
                value: 'Developer'
            },
            {
                label: 'Manager',
                value: 'Manager'
            },
            {
                label: 'Student',
                value: 'Student'
            },
            {
                label: 'Teacher',
                value: 'Teacher'
            },
            {
                label: 'Intern',
                value: 'Intern'
            },
            {
                label: 'Other',
                value: 'Other'
            }
        ];

        let socialInputs = null;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        type="text"
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        type="text"
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        type="text"
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        type="text"
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        type="text"
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile
                                stand out!
                            </p>
                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL."
                                />
                                <SelectListGroup
                                    name="status"
                                    value={status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career."
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Company"
                                    name="company"
                                    value={company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    value={website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="* Skills"
                                    name="skills"
                                    value={skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                                    HTML,CSS,JavaScript,PHP)"
                                />
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    type="text"
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Link
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="Submit"
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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
