const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput({
    school = '',
    degree = '',
    fieldofstudy = '',
    from = ''
}) {
    let errors = {};

    if(validator.isEmpty(school)) {
        errors.school = 'School field is required!';
    }

    if(validator.isEmpty(degree)) {
        errors.degree = 'Degree field is required!';
    }
    
    if(validator.isEmpty(fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required!';
    }

    if(validator.isEmpty(from)) {
        errors.from = 'From date field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};