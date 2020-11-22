"use strict";

/**
 * The validator class, this class will hold all functionality of the validation process.
 * 
 */
const Validator = class {

    constructor(session = null) {
        this.session = session;
        this.validationData;
        this.validationRules;

        this.validationErrors = {};

        this.messages = {},

        this.error = {
            messages: {
                required: (fieldName) => {
                    if (typeof(this.messages.required) === 'function') {
                        return this.messages.required(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field is required`;
                },
                max: (fieldName, args = []) => {
                    if (typeof(this.messages.max) === 'function') {
                        return this.messages.max(fieldName, args);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be have maximum length of ${args[0]}`;
                },
                min: (fieldName, args = []) => {
                    if (typeof(this.messages.min) === 'function') {
                        return this.messages.min(fieldName, args);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be have minimum length of ${args[0]}`;
                },
                string: (fieldName) => {
                    if (typeof(this.messages.string) === 'function') {
                        return this.messages.string(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be a string`;
                },
                numeric: (fieldName) => {
                    if (typeof(this.messages.numeric) === 'function') {
                        return this.messages.numeric(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be a number`;
                },
                alpha: (fieldName) => {
                    if (typeof(this.messages.alpha) === 'function') {
                        return this.messages.alpha(fieldName)
                    }

                    return `The ${fieldName} field must be character`;
                },
                alpha_numeric: (fieldName) => {
                    if (typeof(this.messages.alpha_numeric) === 'function') {
                        return this.messages.alpha_numeric(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be an alpha numeric`;
                },
                email: (fieldName) => {
                    if (typeof(this.messages.email) === 'function') {
                        return this.messages.email(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be a valid email`;
                },
                integer: (fieldName) => {
                    if (typeof(this.messages.integer) === 'function') {
                        return this.messages.integer(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be an integer`;
                },
                between: (fieldName, args = []) => {
                    if (typeof(this.messages.between) === 'function') {
                        return this.messages.between(fieldName, args);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must have length between ${args[0]} and ${args[1]}`;
                },
                url: (fieldName) => {
                    if (typeof(this.messages.url) === 'function') {
                        return this.messages.url(fieldName);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must a valid url`;
                },
                enum: (fieldName, args = []) => {
                    if (typeof(this.messages.enum) === 'function') {
                        return this.messages.enum(fieldName, args);
                    }

                    return `The ${fieldName.replace('_', ' ')} field must be either one of these options ${args.join(',')}`;
                }
            },
        };
        
        this.rules = {
            required: (data) => {
                if (!this.validationData[data]) {
                    return false;
                }

                if (this.validationData[data] === '' || this.validationData[data] === undefined) {
                    return false;
                }

                return true;
            },
            max: (data, args) => {
                const sample = args[0];

                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                if (typeof this.validationData[data] === "number") {
                    if (this.validationData[data] > sample) {
                        return false
                    }
                }

                if(this.validationData[data].length > sample) {
                    return false;
                }

                return true;

            },
            min: (data, args = []) => {
                const sample = Number(args[0]);

                if (!this.validationData[data] && this.validationData[data] === undefined) {
                    return false;
                }

                if (typeof this.validationData[data] === "number") {
                    if (this.validationData[data] < sample) {
                        return false;
                    }
                }

                if(this.validationData[data].length < sample) {
                    return false;
                }

                return true;
        
            },
            string: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                if (typeof this.validationData[data] !== 'string') {
                    return false;
                }

                return true;
            },
            numeric: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }
                const regex = new RegExp(/^[0-9]+$/);

                if(!regex.test(this.validationData[data])) {
                    return false;
                }

                return true;
            },
            alpha: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                const regex = new RegExp(/^[a-zA-Z]+$/);

                if(!regex.test(this.validationData[data])) {
                    return false;
                }

                return true;
            },
            alpha_numeric: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                if (typeof this.validationData[data] === 'number') {
                    return false;
                }

                const regex = new RegExp(/^[a-zA-Z0-9_]*$/);

                if(!regex.test(this.validationData[data])) {
                    return false;
                }

                return true;
            },
            email: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                const sample = this.validationData[data];
                let atCount = 0;
                sample.split('').forEach(function(char) {
                    if (char === '@') {
                        atCount += 1;
                    }
                });

                if (atCount > 1) {
                    return false;
                }

                const regex = new RegExp(/[a-zA-Z0-9]+(@){1}[a-z]+\.([a-z]){2,3}(\.[a-z]{2})?/i);

                if (!regex.test(this.validationData[data])) {
                    return false;
                }

                return true;
            },
            integer: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                if (typeof this.validationData[data] !== 'number') {
                    return false;
                }

                const startWithZero = new RegExp(/^0+/);
                if (startWithZero.test(this.validationData[data])) {
                    return false;
                }

                const hasDot = new RegExp(/[\.]+/);
                if (hasDot.test(this.validationData[data])) {
                    return false;
                }

                return true;
            },
            optional: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    
                    return false;
                }

                return true;
            },
            between: (data, args = []) => {
                let len = this.validationData[data];
                
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }
                
                let [min, max] = args;


                if (typeof this.validationData[data] === 'object') {
                    return false;
                }

                if (typeof this.validationData[data] === 'string') {
                    len = this.validationData[data].length;
                }

                if (len < min) {
                    return false;
                }

                if (len > max) {
                    return false;
                }

                return true;
            },
            url: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                if (typeof this.validationData[data] === 'number') {
                    return false;
                }

                const regex = new RegExp(/https?:\/\/[a-z\.]+[a-z\-]+(\.[a-z]{2,5})(\.[a-z]{2,5})?/i);

                if (!regex.test(this.validationData[data])) {
                    return false;
                }

                return true;
            },
            enum: (data, args = []) => {

                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return false;
                }

                if (args.length === 0) {
                    return false;
                }

                if (args.indexOf(this.validationData[data]) === -1) {
                    return false;
                }

                return true;
            },
        };
    };
}

/**
 * Begin validation process for given fields and rules
 * 
 * @param {none}
 * @return {void}
 */

Validator.prototype.processValidation = function() {
    const validationKeys = Object.keys(this.validationRules);
    
    validationKeys.forEach((key) => {
        const rules = this.validationRules[key].split('|');
        
        for (let index = 0; index < rules.length; index++) {
            let param = null;
            let ruleName = rules[index];

            if (ruleName.indexOf(':') > 1) {
                [ruleName, param] = ruleName.split(':');
            }

            if (typeof(this.validationData[ruleName]) === "string") {
                this.validationData[ruleName] = this.validationData[ruleName].trim();
            }

            if (param !== null && param.indexOf(',') > 0) {
                let params = param.split(',');

                if (!this.rules[ruleName](key, params) && ruleName !== 'optional') {
                    this.fillError(key, ruleName, params);
                }

            } else {
                
                if(!this.rules[ruleName](key, [param]) && ruleName === 'optional') {
                    break;
                }
    
                if (!this.rules[ruleName](key, [param]) && ruleName !== 'optional') {
                    this.fillError(key, ruleName, [param]);
                }
            }

        }
        
    });

    this.messages = {};
}

/**
 * Begin validation with promise for session store.
 * 
 * @param none
 * @return {Promise}
 */
Validator.prototype.validate = function() {
    
    return new Promise((resolve) => {
        
        this.processValidation();

        let result = {
            status: (!this.hasError()) ? 'success':'error'
        };

        if (result.status === 'success') {
            result.data = this.validationData;
        } else {
            result.data = this.validationErrors;
        }
    
        resolve(result);
    });
}

/**
 * Get validation error messages for given field name.
 * 
 * @param {string} name 
 * @return {array}
 */
Validator.prototype.getError = function(name) {
    if (this.validationErrors[name]) {
        return this.validationErrors[name][0];
    }

    return '';
}

/**
 * Return all validation error messages for each field.
 * 
 * @param {string} key
 * @return {objects}
 */
Validator.prototype.getAllErrors = function(key = null) {
    if (key) {
        if (this.validationErrors[key]) {
            return this.validationErrors[key]
        }

        return [];
    }

    return this.validationErrors;
}

/**
 * Store and receive the validation messages from session.
 * 
 * @param {none}
 * @return {objects}
 */
Validator.prototype.flashErrors = function() {

    if (this.session) {
        let errors = this.session.validationErrors;
        this.session.validationErrors = null;

        return errors;
    }

    return null;
}

/**
 * Check if validation process has error in any fields.
 * 
 * @param {string} key
 * @return {boolean}
 */
Validator.prototype.hasError = function(key = null) {

    const errorKeys = Object.keys(this.validationErrors);

    if (key) {
        return errorKeys.some((item) => item === key);    
    }

    if (errorKeys.length > 0) {
        return true;
    }

    return false;
}

/**
 * If validation was fail store error message to specified field
 * 
 * @param {string} fieldName 
 * @param {string} validationKey 
 * @param {mix} param
 * @return {void} 
 */
Validator.prototype.fillError = function(fieldName, validationKey, params) {

    if (!this.validationErrors[fieldName]) {
        this.validationErrors[fieldName] = [this.error.messages[validationKey](fieldName, params)];
    } else {
        this.validationErrors[fieldName].push(this.error.messages[validationKey](fieldName, params));
    }
}

/**
 * Initiate the validation.
 * 
 * @param {object} data 
 * @param {string} rules 
 */
Validator.prototype.build = function(data, rules) {
    this.cleanUp();

    this.validationData = data;
    this.validationRules = rules;

    return this;
}

/**
 * Make sure all validationData, validationRules and validationErrors are in default state.
 * 
 * @param {none}
 * @return {void}
 */
Validator.prototype.cleanUp = function() {
    this.validationData = null;
    this.validationRules = null;
    this.validationErrors = {};
}

/**
 * Set custom error messages
 * @param {object} errorMessages 
 */

Validator.prototype.setErrorMessages = function(errorMessages = {}) {
    if (typeof(errorMessages) !== 'object') {
        console.log('Error messages must be an object');
        return;
    }

   this.messages = errorMessages;
}


const validation = function() {
    
    return function(req, res, next) {

        if (!req.validator) {
            req.validator = new Validator(req.session);
        }

        if (!res.locals.validationErrors) {
            res.locals.validationErrors = req.validator.flashErrors();
        }
    
        next();
    }
}

module.exports = {
    validation,
    Validator
};
