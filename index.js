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

        this.error = {
            messages: {
                required: () => 'This field is required',
                max: (len) => `Maximum length of this field is ${len}`,
                min: (len) => `Minimum length of this field is ${len}`,
                string: () => 'This field must be a string',
                numeric: () => 'This field must be a number',
                alpha: () => 'This field must be character',
                alpha_numeric: () => 'This field must be an alpha numeric',
                email: () => 'This field must be a valid email',
                integer: () => 'This field must be an integer',
            },
        };
        
        this.rules = {
            required: (data) => {
                if (!this.validationData[data]) {
                    return true;
                }

                if (this.validationData[data] === '' || this.validationData[data] === undefined) {
                    return true;
                }

                return false;
            },
            max: (data, len=1) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                if (typeof this.validationData[data] === "number") {
                    if (this.validationData[data] > len) {
                        return true
                    }
                }

                if(this.validationData[data].length > len) {
                    return true;
                }

                return false;

            },
            min: (data, len=1) => {
                if (!this.validationData[data] && this.validationData[data] === undefined) {
                    return true;
                }

                if (typeof this.validationData[data] === "number") {
                    if (this.validationData[data] < len) {
                        return true;
                    }
                }

                if(this.validationData[data].length < len) {
                    return true;
                }

                return false;
        
            },
            string: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                if (typeof this.validationData[data] !== 'string') {
                    return true;
                }

                return false;
            },
            numeric: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }
                const regex = new RegExp(/^[0-9]+$/);

                if(!regex.test(this.validationData[data])) {
                    return true;
                }

                return false;
            },
            alpha: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                const regex = new RegExp(/^[a-zA-Z]+$/);

                if(!regex.test(this.validationData[data])) {
                    return true;
                }

                return false;
            },
            alpha_numeric: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                if (typeof this.validationData[data] === 'number') {
                    return true;
                }

                const regex = new RegExp(/^[a-zA-Z0-9_]*$/);

                if(!regex.test(this.validationData[data])) {
                    return true;
                }

                return false;
            },
            email: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                const sample = this.validationData[data];
                let atCount = 0;
                sample.split('').forEach(function(char) {
                    if (char === '@') {
                        atCount += 1;
                    }
                });

                if (atCount > 1) {
                    return true;
                }

                const regex = new RegExp(/[a-zA-Z0-9]+(@){1}[a-z]+\.([a-z]){2,3}(\.[a-z]{2})?/i);

                if (!regex.test(this.validationData[data])) {
                    return true;
                }

                return false;
            },
            integer: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                if (typeof this.validationData[data] !== 'number') {
                    return true;
                }

                const startWithZero = new RegExp(/^0+/);
                if (startWithZero.test(this.validationData[data])) {
                    return true;
                }

                const hasDot = new RegExp(/[\.]+/);
                if (hasDot.test(this.validationData[data])) {
                    return true;
                }

                return false;
            },
            optional: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    
                    return false;
                }

                return true;
            }
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

            if(!this.rules[ruleName](key, param) && ruleName === 'optional') {
                break;
            }

            if (this.rules[ruleName](key, param) && ruleName !== 'optional') {
                this.fillError(key, ruleName, param);
            }
        }
        
    });
}

/**
 * Begin validation with promise for session store.
 * 
 * @param none
 * @return {Promise}
 */
Validator.prototype.validate = function() {
    
    return new Promise((resolve, reject) => {
        
        this.processValidation();
    
        if (this.session) {
            this.session.validationErrors = this.getAllErrors();
            this.session.save(() => resolve( this.hasError() ));
        } else {
            reject('The session object not defined, use validateSync instead');
        }
    });
}

/**
 * Validate without using cache or any other storage that require promise action
 * 
 * @param{none}
 * @return{void}
 */
Validator.prototype.validateSync = function() {
    this.processValidation();
}

/**
 * Get validation error messages for given field name.
 * 
 * @param {string} name 
 * @return {array}
 */
Validator.prototype.getError = function(name) {
    return this.validationErrors[name];
}

/**
 * Return all validation error messages for each field.
 * 
 * @param {none}
 * @return {objects}
 */
Validator.prototype.getAllErrors = function() {
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
 * @param {none}
 * @return {boolean}
 */
Validator.prototype.hasError = function() {
    if (Object.keys(this.validationErrors).length > 0) {
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
Validator.prototype.fillError = function(fieldName, validationKey, param=null) {
    if (!this.validationErrors[fieldName]) {
        this.validationErrors[fieldName] = [this.error.messages[validationKey](param)];
    } else {
        this.validationErrors[fieldName].push(this.error.messages[validationKey](param));
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
