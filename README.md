# Express Validator
a simple validator package for validating your form requests.

# INSTALLATION
```npm install @kodinggen/express-validator --save```

# USAGE

## A Basic Setup
```javascript
const express = require('express');
const { validation } = require('express-validator');

express.use(validation());
```
<br>
<br>

## Validating request
When initial setup was done, the validator instance also available on `req` object. You can build your validation rule using `req.validator` object.
for instance :
```javascript
app.post('/validation', function(req, res) {

    const { username, email, age, description } = req.body;

    // Build the validation
    const validator = req.validator.build({ username, email, age, description }, {
        username: 'required|string|alpha_numeric',
        email: 'required|string|email',
        age: 'required|integer',
        description: 'optional|string'
    });

    // Validate fields with rules.
    validator.validate().then(function(result) {
         // Check if validation has error for each of rules.
        if (result.status === 'error') {

            // return status 425 and return error all error messages for each rules and fields.
            res.status(425).json(result.data);
        }

        res.end('validation success');
    });
});
```
We build the validation using `req.validator.build()` this function will return the `Validator` instance. first parameter will be your field that need to be validated and second parameter validation rules seperated with `|`, each given field will check all given rules so the error messages for each field will return `array`.
<br>
<br>

> **validateSync** function was method since version 1.0.2, use **validate()** instead

The `validator.validateSync` will validate all given fields and fill the error message if validation was fail for given rules.

> If you working with session library like [express-session](https://github.com/expressjs/session) is highly recommended using the `validate()` method, it will return promise to make sure all validation errors is saved to session object.
> **

<br>
<br>


### Example validation with session
```javascript
const { validation }  = require('./index');
const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'flying cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 60 * 24, httpOnly: false }
}));

app.get('/', function(req, res) {
    return res.render('home');
});

app.post('/validation-session', function(req, res) {
    const { username, email, age, description } = req.body;

    // Build the validator
    const validator = req.validator.build({ username, email, age, description }, {
        username: 'required|string|alpha_numeric',
        email: 'required|string|email',
        age: 'required|integer',
        description: 'optional|string'
    });

    // Validate with rules
    validator.validate().then(function(result) {
        if (result.status === 'error') {
            // If there are validations error redirect to `home` route
            return res.redirect('/home');
        }

        return res.end('validation success');
    }).catch(function(error) {
        return res.end(error);
    });

});

app.listen(3000);
```
<br>

> Since version **1.0.2**, you will assign the `validationErrors` object by your self because this package no longer using `express-session` library for flexibility.

This can be done with:
```javascript
validator.validate().then(function(result) {
    if (result.status === 'error') {
        // If there are validations error redirect to `home` route
        res.locals.validationErrors = result.data;
        return res.redirect('/home');
    }

    return res.end('validation success');
}).catch(function(error) {
    return res.end(error);
});
```
The promise `result` object will contain two properties `status` and `data`, status will contains 'error' or 'success' and `data` will contains validation error messages if validation fail or return all fields with all value already been trim.

```javascript
validator.validate().then(function(result) {
    if (result.status === 'error') {
        // If there are validations error redirect to `home` route
        res.status(200).json(result.data) // This will return validation error messages
    }

    if (result.status === 'success) {
        res.status(200).json(result.data) // This will return all fields and its value.
    }

    return res.end('validation success');
}).catch(function(error) {
    return res.end(error);
});
```

Now you can access `validationErrors` in the view file :

```html
<% if(validationErrors) { %>
    <% if(validationErrors.username) { %>
        <span class="badge badge-danger"><%= validationErrors.username[0] %></span>
    <% } %>
<% } %>
```

<br>
<br>

## Custom Error Messages
> This feature available for version 1.0.2++

Now you can define a custom error message before validation process. For example : 

```javascript
const validator = req.validator.build(req.body, {
    name: 'required|string|min:4',
    email: 'required|string|email',
    content: 'optional'
});

validator.setErrorMessages({
    email: function(fieldName) {
        return `this ${fieldName} field should be a valid email`
    },
    min: function(fieldName, args) {
        return `this ${fieldName} field should have minimal length of ${args[0]}`
    }
});
```

## Available Validation Rules
| Rule Name | Parameters | Descriptions |
|-----------|------------|-------------|
| requried  | none       | Field under this rule must be filled in |
| max       | *max_value*| Field must be have maximum value at given parameter, example usage with parameter `max:10` -> *if string passed it will match length of given string*
| min       | *min_value*| Field must be have minimum value at given parameter, example usage with parameter `min:10` -> *if string passed it will match length of given string*
| string    | none       | Field under this rule must be type of string |
| numeric   | none       | Field under this rule must be numeric value |
| alpha     | none       | Field under this rule must be alphabetic character |
| alpha_numeric | none | Field under this rule must be alphabetic and numeric value |
| email | none | Field under this rule must be valid email |
| integer | none | Field under this rule must be an integer value |
| optional | none | This rule allow some field to be empty |
| between | *min*,*max* | Field under this rule must have value between given parameters, example usage with parameter `between:5,20` |
| url | none | Field under this rule must be valid url |
| enum | a,b,c,...,n | Field under `enum` rule must match between enum set `enum:example1,example2,example3` |

<br>

## API Reference
| Method Name | Parameters | Return Value | Description                                         |
|-------------|------------|--------------|--------------                                        |
| `build()`| none       | validator instance      | initiate the validation. |
| `hasError()`| none       | boolean      | check if validation has any error from each field.|
| `flashError()`| none       | void      | store and receive validation messages from the session.|
| `getAllErrors()`| none       | objects      | return all errors for each field.|
| `getError()`| field_name       | object      | return validation errors for specified field.|
| `validate()`| none       | Promise      | promise based validation process, it will store validation error messages on session storage |
| `setErrorMessages()`| object       | void      | set the custom validation error messages |