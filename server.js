const express = require('express');
const session = require('express-session');
const { validation }  = require('./index');
const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'flying cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 60 * 24, httpOnly: false }
}));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(validation());

app.get('/', function(req, res) {
    req.session.nama = 'Surya Herdiyanto';
    req.session.save(function() {
        res.render('home');
    });
});

app.post('/validation', function(req, res) {

    const { username, email, age, description } = req.body;

    const validator = req.validator.build({ username, email, age, description }, {
        username: 'required|string|alpha_numeric',
        email: 'required|string|email',
        age: 'required|integer',
        description: 'optional|string'
    });

    validator.validateSync();

    if (validator.hasError()) {
        return res.status(425).json(validator.getAllErrors());
    }

    return res.end('validator testing');
});

app.post('/validation-session', function(req, res) {
    const { username, email, age, description } = req.body;

    const validator = req.validator.build({ username, email, age, description }, {
        username: 'required|string|alpha_numeric',
        email: 'required|string|email',
        age: 'required|integer',
        description: 'optional|string'
    });

    validator.validate().then(function(fail) {
        if (fail) {
            return res.status(425).json(validator.flashErrors());
        }

        return res.end('validation success');
    }).catch(function(error) {
        return res.end(error);
    });

});

app.post('/validation-form', function(req, res) {
    const { name, age } = req.body;

    const validator = req.validator.build({ name, age }, {
        name: 'required|string|alpha_numeric',
        age: 'required|integer'
    });

    validator.validate().then(function(fail) {
        if (fail) {
            return res.redirect('/');
        }

        return res.end('validation success');
    }).catch(function(error) {
        return res.end(error);
    });
})

app.listen(3000);