const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput({
    title = '',
    company = '',
    from = ''
}) {
    let errors = {};

    if(validator.isEmpty(title)) {
        errors.title = 'Job title field is required!';
    }

    if(validator.isEmpty(company)) {
        errors.company = 'Company field is required!';
    }

    if(validator.isEmpty(from)) {
        errors.from = 'From date field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};