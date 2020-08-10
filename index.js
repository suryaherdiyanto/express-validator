const Validator = class {

    constructor(data, rules) {
        this.validationData = data;
        this.validationRules = rules;

        this.validationErrors = {};

        this.error = {
            messages: {
                required: () => 'This field is required',
                max: (len) => `Maximum length of this field is ${len}`,
                min: (len) => `Minimum length of this field is ${len}`
            },
        };
        
        this.rules = {
            required: (data,) => {
                if (this.validationData[data] === '') {
                    return true
                }

                return false;
            },
            max: (data, len=1) => {
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
                if (typeof this.validationData[data] === "number") {
                    if (this.validationData[data] < len) {
                        return true;
                    }
                }

                if(this.validationData[data].length < len) {
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
