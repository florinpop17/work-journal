import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    state = {
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = this.state;

        const eduData = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        this.props.addEducation(eduData, this.props.history);
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onCheck = e => {
        const { current, disabled } = this.state;
        this.setState({
            disabled: !disabled,
            current: !current
        });
    };

    render() {
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
            errors,
            disabled
        } = this.state;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Add education
                            </h1>
                            <p className="lead text-center">
                                Add any school or bootcamp you have attended
                            </p>
                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="name"
                                    placeholder="* School name"
                                    name="school"
                                    value={school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    type="name"
                                    placeholder="* Degree or Certification"
                                    name="degree"
                                    value={degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    type="name"
                                    placeholder="* Field of study"
                                    name="fieldofstudy"
                                    value={fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={disabled}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={current}
                                        checked={current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label
                                        htmlFor="current"
                                        className="form-check-label"
                                    >
                                        Currently studying here
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Program Description"
                                    name="description"
                                    value={description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the program that you are in"
                                />
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
    withRouter(AddEducation)
);
