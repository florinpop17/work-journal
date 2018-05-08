const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput({
    name = '',
    email = '',
    password = '',
    password2 = ''
}) {
    let errors = {};

    if(!validator.isLength(name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters!';
    }

    if(validator.isEmpty(name)) {
        errors.name = 'Name field is required!';
    }

    if(!validator.isEmail(email)) {
        errors.email = 'Email is invalid!';
    }

    if(validator.isEmpty(email)) {
        errors.email = 'Email field is required!';
    }

    if(!validator.isLength(password, { min: 6 })) {
        errors.password = 'Password must be at least 6 characters!';
    }

    if(validator.isEmpty(password)) {
        errors.password = 'Password field is required!';
    }

    if(!validator.equals(password, password2)) {
        errors.password2 = 'Passwords must match!';
    }

    if(validator.isEmpty(password2)) {
        errors.password2 = 'Confirm password field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};