const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput({
    email = '',
    password = '',
}) {
    let errors = {};

    if(validator.isEmpty(email)) {
        errors.email = 'Email field is required!';
    }

    if(validator.isEmpty(password)) {
        errors.password = 'Password field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};