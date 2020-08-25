# Express Validator
a simple validator package for validating your form requests.

# INSTALLATION
```npm install express-validator --save```

# USAGE

### A Basic Setup
```javascript
const express = require('express');
const { validation } = require('express-validator');

express.use(validation());
```

### Validating request
When initial setup was done, the validator instance also available on `req` object. You can build your validation rule using `req.validator` instance.
for instance :
```javascript
app.post('/validation', function(req, res) {

    const { username, email, age, description } = req.body;

    const validator = req.validator.build({ username, email, age, description }, {
        username: 'required|string|alpha_numeric',
        email: 'required|string|email',
        age: 'required|integer',
        description: 'optional|string'
    });

    validator.validate();

    // Check if validation has error for each of rules.
    if (validator.hasError()) {

        // return status 425 and return error all error messages for each rules and fields.
        res.status(425).json(validator.getAllErrors());
    }

    res.end('validator testing');
});
```
we build the validation using `req.validator.build()` this function will return the `Validator` instance. first parameter will be your field that need to be validated and second parameter validation rules seperated with `|`, each given field will check all given rules so the error messages for each field will return `array`.

the `validator.validate` will validate all given fields and fill the error message if validation was fail for given rules.

## Available Validation Rules
- requried
- max:number_of_max_value
- min:number_of_min_value
- string
- numeric
- alpha
- alpha_numeric
- email
- integer
- optional

## Available Methods
| Method Name | Parameters | Return Value | Description                                         |
|-------------|------------|--------------|--------------                                        |
| `build()`| none       | validator instance      | initiate the validation. |
| `hasError()`| none       | boolean      | check if validation has any error from each field.|
| `flashError()`| none       | void      | store the validation messages to the session.|
| `getAllErrors()`| none       | objects      | return all errors for each field.|
| `getError()`| field_name       | object      | return validation errors for specified field.|
| `validate()`| none       | void      | running the validation process.|