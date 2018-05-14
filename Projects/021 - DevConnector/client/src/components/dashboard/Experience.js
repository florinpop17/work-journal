import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
    onDeteleClick = id => {
        this.props.deleteExperience(id);
    };

    render() {
        const { experience } = this.props;
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                {experience && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Years</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {experience.map(exp => (
                                <tr key={exp._id}>
                                    <td>{exp.company}</td>
                                    <td>{exp.title}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">
                                            {exp.from}
                                        </Moment>
                                        -
                                        {exp.to === null ? (
                                            'Now'
                                        ) : (
                                            <Moment format="YYYY/MM/DD">
                                                {exp.to}
                                            </Moment>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                this.onDeteleClick(exp._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
