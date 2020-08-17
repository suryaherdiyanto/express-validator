const Validator = class {

    constructor(data, rules) {
        this.validationData = data;
        this.validationRules = rules;

        this.validationErrors = {};

        this.error = {
            messages: {
                required: () => 'This field is required',
                max: (len) => `Maximum length of this field is ${len}`,
                min: (len) => `Minimum length of this field is ${len}`,
                string: () => 'This field must be a string',
                numeric: () => 'This field must be a number',
                alpha: () => 'This field must be character',
                email: () => 'This field must be a valid email'
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
            email: (data) => {
                if (!this.validationData[data] || this.validationData[data] === undefined) {
                    return true;
                }

                const sample = this.validationData[data];
                let atCount = 0;
                sample.split('').forEach(function(char) {
                    if (char === '@') {
                        atCount++;
                    }

                    if (atCount > 1) {
                        return true;
                    }
                });

                const regex = new RegExp(/[a-zA-Z0-9]+(@){1}[a-z]+\.(com|co|org|net|biz)(\.[a-z]{2})?/i);

                if (!regex.test(data)) {
                    return true;
                }

                return false;
            }
        };
    };
}

Validator.prototype.validate = function() {
    
    const validationKeys = Object.keys(this.validationRules);

    validationKeys.forEach((key) => {
        const rules = this.validationRules[key].split('|');
        
        rules.forEach((rule) => {
            let param = null;
            let ruleName = rule;

            if (rule.indexOf(':') > 1) {
                [ruleName, param] = rule.split(':');
            }

            if (this.rules[ruleName](key, param)) {
                this.fillError(key, ruleName, param);
            }
        });
        
    });
}

Validator.prototype.getError = function(name) {
    return this.validationErrors[name];
}

Validator.prototype.getAllErrors = function() {
    return this.validationErrors;
}

Validator.prototype.hasError = function() {
    if (Object.keys(this.validationErrors).length > 0) {
        return true;
    }

    return false;
}

Validator.prototype.fillError = function(fieldName, validationKey, param=null) {
    if (!this.validationErrors[fieldName]) {
        this.validationErrors[fieldName] = [this.error.messages[validationKey](param)];
    } else {
        this.validationErrors[fieldName].push(this.error.messages[validationKey](param));
    }
}

const validator = new Validator(
    { name: 'surya', text: 'abcf', number: 10 },
    { name: 'required|min:2', text: 'required|max:4', number: 'max:5' }
);

module.exports = Validator;
