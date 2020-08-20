const expect = require('chai').expect;
const { testRequired, testMax, testMin, testString, testNumeric, testAlpha, testEmail, testInteger, testAlphaNumeric } = require('./unit');
const { Validator } = require('../index');

describe('testing unit all validation rules', function() {
    it('test required rule return true if nothing passed', function() {
        testRequired('');
    });
    it('test required rule return true if null passed', function() {
        testRequired(null);
    });
    it('test required rule return true if undefined passed', function() {
        testRequired(undefined);
    });

    it('test max rule with sample data type is null return true if null passed', function() {
        testMax(null, 10);
    });
    it('test max rule with sample data type is undefined return true if undefined passed', function() {
        testMax(undefined, 10);
    });
    it('test max rule with sample data type is number return true if sample data value greather than given parameter', function() {
        testMax(11, 10);
    });
    it('test max rule with sample data type is number return false if sample data have same length with given parameter', function() {
        testMax(10, 10, true);
    });
    it('test max rule with sample data type is string return true if sample data length is grather than given parameter', function() {
        testMax('sample data', 10);
    });
    it('test max rule with sample data type is string return false if sample data length is lesser than given parameter', function() {
        testMax('sample', 10, true);
    });

    it('test min rule with sample data type is null return true if null passed', function() {
        testMax(null, 10);
    });
    it('test min rule with sample data type is undefined return true if undefined passed', function() {
        testMax(undefined, 10);
    });
    it('test min rule with sample data type is number return true if sample data value lesser than given parameter', function() {
        testMin(5, 10);
    });
    it('test min rule with sample data type is number return false if sample data have same length with given parameter', function() {
        testMin(5, 5, true);
    });
    it('test min rule with sample data type is string return true if sample data length is lesser than given parameter', function() {
        testMin('sample', 10);
    });
    it('test min rule with sample data type is string return false if sample data length is greather than given parameter', function() {
        testMin('sample data', 5, true);
    });

    it('test string rule with sample data type is string return true if nothing passed', function() {
        testString('');
    });
    it('test string rule with sample data type is null return true if null passed', function() {
        testString(null);
    });
    it('test string rule with sample data type is number return true if numeric is passed', function() {
        testString(123456);
    });
    it('test string rule with sample data type is string return false if numeric is passed', function() {
        testString('123456', true);
    });
    it('test string rule with sample data type is string return false if character is passed', function() {
        testString('abcd', true);
    });

    it('test numeric rule with sample data type is null return true if null passed', function() {
        testNumeric(null);
    });
    it('test numeric rule with sample data type is string return true if character passed', function() {
        testNumeric('abcdefg');
    });
    it('test numeric rule with sample data type is string return true if mix value passed', function() {
        testNumeric('abcdefg 123123');
    });
    it('test numeric rule with sample data type is nubmer return true if floating point passed', function() {
        testNumeric(100.90);
    });
    it('test numeric rule with sample data type is string return false if numeric passed', function() {
        testNumeric('123123', true);
    });
    it('test numeric rule with sample data type is number return false if numeric passed', function() {
        testNumeric(92388847, true);
    });

    it('test alpha rule with sample data type is null return true if null passed', function() {
        testAlpha(null);
    });
    it('test alpha rule with sample data type is number return true if number passed', function() {
        testAlpha(1234567);
    });
    it('test alpha rule with sample data type is string return true if number passed', function() {
        testAlpha('1234567');
    });
    it('test alpha rule with sample data type is string return true if mix value passed', function() {
        testAlpha('aBcdefr 1234567');
    });
    it('test alpha rule with sample data type is string return false if character passed', function() {
        testAlpha('qwerty', true);
    });

    it('test alpha numeric rule with sample data type is null return true if null passed', function() {
        testAlphaNumeric(null);
    });
    it('test alpha numeric rule with sample data type is number return true if number passed', function() {
        testAlphaNumeric(1234567);
    });
    it('test alpha numeric rule with sample data type is string return false if number passed', function() {
        testAlphaNumeric('1234567', true);
    });
    it('test alpha numeric rule with sample data type is string return false if mix value passed', function() {
        testAlphaNumeric('aBcdefr1234567', true);
    });
    it('test alpha numeric rule with sample data type is string return false if character passed', function() {
        testAlphaNumeric('qwerty123', true);
    });

    it('test email rule with sample data empty string, will produce true', function() {
        testEmail('');
    });
    it('test email rule with sample data null, will produce true', function() {
        testEmail(null);
    });
    it('test email rule with sample data bogus string, will produce true', function() {
        testEmail('asdf fdas asdf@!');
    });
    it('test email rule with sample data numeric, will produce true', function() {
        testEmail('126377748');
    });
    it('test email rule with sample data alpha numeric, will produce true', function() {
        testEmail('dfjkdfnnasd 9200012');
    });
    it('test email rule with sample data email with double @, will produce true', function() {
        testEmail('example@yahoo@gmail.com');
    });
    it('test email rule with sample data a valid email, will produce false', function() {
        testEmail('johndoe@example.com', true);
    });
    it('test email rule with sample data a valid email with country code domain, will produce false', function() {
        testEmail('example@example.co.au', true);
    });

    it('test integer rule with sample data null, will produce true', function() {
        testInteger(null);
    });
    it('test integer with sample data type string, will produce true', function() {
        testInteger('0388894100');
    });
    it('test integer rule with sample data type floating point, will produce true', function() {
        testInteger(77.7);
    });
    it('test integer rule with sample data type integer, return false if valid integer passed', function() {
        testInteger(1030699, true);
    });

});

describe('testing validator must working properly', function() {
    it('validate required if none passed', function() {
        let validator = new Validator();
        validator.build({ name: '' }, { name: 'required' });
    
        validator.validate();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();
    
        expect(isError).to.be.true;
        expect(isError).to.be.a('boolean');
        expect(errors).to.have.property('name');
        expect(errors.name).to.be.an('array').have.lengthOf(1);
        expect(errors.name[0]).to.be.equal('This field is required');
    });
    
    it('validate required max min with all validations passes', function() {
        let validator = new Validator();
        validator.build({ name: 'surya' }, { name: 'required|max:5|min:2' });
        
        validator.validate();
        const isError = validator.hasError();
    
        expect(isError).to.equal(false);
        expect(isError).to.be.a('boolean');
        expect(validator.getAllErrors()).not.have.property('name');
    });

    it('validation with multiple field and rules all validation passes', function() {
        let validator = new Validator();
        validator.build(
        {     
            username: 'johndoe123|alpha_numeric',
            password: '123123123',
            email: 'johndoe@example.com',
            age: 20,
            note: 'the sample text'

        }, 
        { 
            username: 'required|string',
            password: 'required|min:6',
            email: 'required|string|email',
            age: 'required|integer|max:25',
            note: 'optional|string'
        }
        );

        validator.validate();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();

        expect(errors).not.have.property('username');
        expect(errors).not.have.property('password');
        expect(errors).not.have.property('email');
        expect(errors).not.have.property('age');
        expect(errors).not.have.property('string');
        expect(isError).to.be.a('boolean').to.equal(false);
    });

    it('validation with multiple field and rules with error in email, password, age and note fields', function() {
        let validator = new Validator();
        validator.build(
        {     
            username: 'john!@#doe123',
            password: '1231',
            email: 'johndoe@example',
            age: '20',
            note: 123123

        }, 
        { 
            username: 'required|string|alpha_numeric',
            password: 'required|min:6',
            email: 'required|string|email',
            age: 'required|integer|max:25',
            note: 'optional|string'
        }
        );

        validator.validate();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();

        expect(errors).have.property('username');
        expect(errors).have.property('password');
        expect(errors).have.property('email');
        expect(errors).have.property('age');
        expect(errors).have.property('note');
        
        expect(errors.username).have.lengthOf(1);
        expect(errors.password).have.lengthOf(1);
        expect(errors.email).have.lengthOf(1);
        expect(errors.age).have.lengthOf(1);
        expect(errors.note).have.lengthOf(1);
        expect(isError).to.be.true;
    })
});
