const chai = require('chai');

const expect = chai.expect;
const { 
    testRequired,
    testMax,
    testMin,
    testString,
    testNumeric,
    testAlpha,
    testEmail,
    testInteger,
    testAlphaNumeric,
    testBetween,
    testUrl,
    testEnum
 } = require('./unit');
const { Validator } = require('../index');

describe('testing unit all validation rules', function() {
    it('test required rule return false if nothing passed', function() {
        testRequired('');
    });
    it('test required rule return false if null passed', function() {
        testRequired(null);
    });
    it('test required rule return false if undefined passed', function() {
        testRequired(undefined);
    });

    it('test max rule with sample data type is null return false if null passed', function() {
        testMax(null, [10]);
    });
    it('test max rule with sample data type is undefined return false if undefined passed', function() {
        testMax(undefined, [10]);
    });
    it('test max rule with sample data type is number return false if sample data value greather than given parameter', function() {
        testMax(11, [10]);
    });
    it('test max rule with sample data type is number return true if sample data have same length with given parameter', function() {
        testMax(10, [10], true);
    });
    it('test max rule with sample data type is string return false if sample data length is grather than given parameter', function() {
        testMax('sample data', [10]);
    });
    it('test max rule with sample data type is string return true if sample data length is lesser than given parameter', function() {
        testMax('sample', [10], true);
    });

    it('test min rule with sample data type is null return false if null passed', function() {
        testMax(null, [10]);
    });
    it('test min rule with sample data type is undefined return false if undefined passed', function() {
        testMax(undefined, [10]);
    });
    it('test min rule with sample data type is number return false if sample data value lesser than given parameter', function() {
        testMin(5, [10]);
    });
    it('test min rule with sample data type is number return true if sample data have same length with given parameter', function() {
        testMin(5, [5], true);
    });
    it('test min rule with sample data type is string return false if sample data length is lesser than given parameter', function() {
        testMin('sample', [10]);
    });
    it('test min rule with sample data type is string return true if sample data length is greather than given parameter', function() {
        testMin('sample data', [5], true);
    });

    it('test string rule with sample data type is string return false if nothing passed', function() {
        testString('');
    });
    it('test string rule with sample data type is null return false if null passed', function() {
        testString(null);
    });
    it('test string rule with sample data type is number return false if numeric is passed', function() {
        testString(123456);
    });
    it('test string rule with sample data type is string return true if numeric is passed', function() {
        testString('123456', true);
    });
    it('test string rule with sample data type is string return true if character is passed', function() {
        testString('abcd', true);
    });

    it('test numeric rule with sample data type is null return false if null passed', function() {
        testNumeric(null);
    });
    it('test numeric rule with sample data type is string return false if character passed', function() {
        testNumeric('abcdefg');
    });
    it('test numeric rule with sample data type is string return false if mix value passed', function() {
        testNumeric('abcdefg 123123');
    });
    it('test numeric rule with sample data type is nubmer return false if floating point passed', function() {
        testNumeric(100.90);
    });
    it('test numeric rule with sample data type is string return true if numeric passed', function() {
        testNumeric('123123', true);
    });
    it('test numeric rule with sample data type is number return true if numeric passed', function() {
        testNumeric(92388847, true);
    });

    it('test alpha rule with sample data type is null return false if null passed', function() {
        testAlpha(null);
    });
    it('test alpha rule with sample data type is number return false if number passed', function() {
        testAlpha(1234567);
    });
    it('test alpha rule with sample data type is string return false if number passed', function() {
        testAlpha('1234567');
    });
    it('test alpha rule with sample data type is string return false if mix value passed', function() {
        testAlpha('aBcdefr 1234567');
    });
    it('test alpha rule with sample data type is string return true if character passed', function() {
        testAlpha('qwerty', true);
    });

    it('test alpha numeric rule with sample data type is null return false if null passed', function() {
        testAlphaNumeric(null);
    });
    it('test alpha numeric rule with sample data type is number return false if number passed', function() {
        testAlphaNumeric(1234567);
    });
    it('test alpha numeric rule with sample data type is string return true if number passed', function() {
        testAlphaNumeric('1234567', true);
    });
    it('test alpha numeric rule with sample data type is string return true if mix value passed', function() {
        testAlphaNumeric('aBcdefr1234567', true);
    });
    it('test alpha numeric rule with sample data type is string return true if character passed', function() {
        testAlphaNumeric('qwerty123', true);
    });

    it('test email rule with sample data empty string, will produce false', function() {
        testEmail('');
    });
    it('test email rule with sample data null, will produce false', function() {
        testEmail(null);
    });
    it('test email rule with sample data bogus string, will produce false', function() {
        testEmail('asdf fdas asdf@!');
    });
    it('test email rule with sample data numeric, will produce false', function() {
        testEmail('126377748');
    });
    it('test email rule with sample data alpha numeric, will produce false', function() {
        testEmail('dfjkdfnnasd 9200012');
    });
    it('test email rule with sample data email with double @, will produce false', function() {
        testEmail('example@yahoo@gmail.com');
    });
    it('test email rule with sample data a valid email, will produce true', function() {
        testEmail('johndoe@example.com', true);
    });
    it('test email rule with sample data a valid email with country code domain, will produce true', function() {
        testEmail('example@example.co.au', true);
    });
    it('test email rule with sample data a valid email with country code domain only, will produce true', function() {
        testEmail('johndoe@example.au', true);
    });

    it('test integer rule with sample data null, will produce false', function() {
        testInteger(null);
    });
    it('test integer with sample data type string, will produce false', function() {
        testInteger('0388894100');
    });
    it('test integer rule with sample data type floating point, will produce false', function() {
        testInteger(77.7);
    });
    it('test integer rule with sample data type integer, return false if valid integer passed', function() {
        testInteger(1030699, true);
    });

    it('test between rule with sample data null and undefined, will produce false', function() {
        testBetween(null, [0, 1]);
        testBetween(undefined, [0, 1]);
    });
    it('test between rule with sample data string exceed min and max value, will produce false', function() {
        let min=6;
        let max=12;

        testBetween('john', [min, max]);
        testBetween('alex', [min, max]);
        testBetween('jenn', [min, max]);
        testBetween('june', [min, max]);
        testBetween('broo', [min, max]);
        testBetween('Alexander Grahambell', [min, max]);
        testBetween('Galileo Galilei', [min, max]);
        testBetween('Thomas Alfa Edison', [min, max]);
    });
    it('test between rule with sample data number exceed min and max value, will produce false', function() {
        let min=8;
        let max=25;

        testBetween(30, [min, max]);
        testBetween(0, [min, max]);
        testBetween(-1, [min, max]);
        testBetween(2, [min, max]);
        testBetween(7.5, [min, max]);
        testBetween(7.9, [min, max]);
        testBetween(30.1, [min, max]);
        testBetween(25.1, [min, max]);
    });
    it('test between rule with sample data string in between min and max value, will produce true', function() {
        let min=2;
        let max=20;

        testBetween('john', [min, max], true);
        testBetween('alex', [min, max], true);
        testBetween('jenn', [min, max], true);
        testBetween('june', [min, max], true);
        testBetween('broo', [min, max], true);
        testBetween('Alexander Grahambell', [min, max], true);
        testBetween('Galileo Galilei', [min, max], true);
        testBetween('Thomas Alfa Edison', [min, max], true);
    });
    it('test between rule with sample data number in between min and max value, will produce true', function() {
        let min=8;
        let max=25;

        testBetween(8.1, [min, max], true);
        testBetween(12, [min, max], true);
        testBetween(20, [min, max], true);
        testBetween(22, [min, max], true);
        testBetween(20.98, [min, max], true);
        testBetween(17, [min, max], true);
        testBetween(11, [min, max], true);
        testBetween(9, [min, max], true);
    });
    it('test url rule with null and undefined passed, will produce false', function() {
        testUrl(null);
        testUrl(undefined);
    });

    it('test url rule with number passed, will produce false', function() {
        testUrl(99992837);
        testUrl('12778237');
    });

    it('test url rule with random string passed, will produce false', function() {
        testUrl('this is will not valid');
        testUrl('abcdefd1234567');
        testUrl('htt://welcome-to-my-site.com');
        testUrl('www.mysite.com');
    });

    it('test url rule valid url passed, will produce true', function() {
        testUrl('http://my-site.com', true);
        testUrl('https://example.com', true);
        testUrl('https://www.welcome-to-my-site.id', true);
        testUrl('http://www.awesome.co.au', true);
    });

    it('test enum rule no enum set passed or sample not in enum set, will produce false', function() {
        testEnum('online', []);
        testEnum('active', ['online', 'not online']);
        testEnum('passed', ['not passed']);
    });
    it('text enum rule sample in one of enum set, will produce true', function() {
        testEnum('online', ['online', 'not online'], true);
        testEnum('active', ['not active', 'disabled', 'active'], true);
        testEnum('deleted', ['present', 'deleted', 'passed'], true);
    })

});

describe('testing validator must working properly', function() {
    it('validateSync required if none passed', function() {
        let validator = new Validator();
        validator.build({ name: '' }, { name: 'required' });
    
        validator.validateSync();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();
    
        expect(isError).to.be.true;
        expect(isError).to.be.a('boolean');
        expect(errors).to.have.property('name');
        expect(errors.name).to.be.an('array').have.lengthOf(1);
        expect(errors.name[0]).to.be.equal('The name field is required');

        expect(validator.hasError('name')).to.be.true;
        expect(validator.getError('name')).equal('The name field is required');
        expect(validator.getAllErrors('name')).have.lengthOf(1);
    });
    
    it('validateSync required max min with all validations passes', function() {
        let validator = new Validator();
        validator.build({ name: 'surya' }, { name: 'required|max:5|min:2' });
        
        validator.validateSync();
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
            mark: 70,
            note: 'the sample text',
            website_url: 'https://www.my-awesome-website.com',
            status: 'active'

        }, 
        { 
            username: 'required|string',
            password: 'required|min:6',
            email: 'required|string|email',
            age: 'required|integer|max:25',
            mark: 'required|integer|between:60,95',
            website_url: 'optional|string|url',
            note: 'optional|string',
            status: 'enum:active,not_active,process'
        }
        );

        validator.validateSync();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();

        expect(errors).not.have.property('username');
        expect(errors).not.have.property('password');
        expect(errors).not.have.property('email');
        expect(errors).not.have.property('age');
        expect(errors).not.have.property('string');
        expect(errors).not.have.property('mark');
        expect(errors).not.have.property('website_url');
        expect(isError).to.be.a('boolean').to.equal(false);
    });

    it('validation with multiple field and rules with error in url field', function() {
        let validator = new Validator();
        validator.build(
        {     
            username: 'johndoe123',
            password: '1231',
            email: 'johndoe@example',
            age: 20,
            website_url: 'httt:/mywebsite.id'

        }, 
        { 
            username: 'required|string',
            password: 'required|min:6',
            email: 'required|string|email',
            age: 'required|integer|max:25',
            website_url: 'required|url'
        }
        );

        validator.validateSync();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();

        expect(isError).to.be.true;
        expect(errors).have.property('website_url').have.lengthOf(1);
        expect(errors.website_url[0]).equal('The website url field must a valid url');
    })

    it('validation with multiple field and rules with error in email, password, age, mark, status and note fields', function() {
        let validator = new Validator();
        validator.build(
        {     
            username: 'johndoe123',
            password: '1231',
            email: 'johndoe@example',
            age: '20',
            mark: 70,
            note: 123123,
            status: 'unknown'

        }, 
        { 
            username: 'required|string',
            password: 'required|min:6',
            email: 'required|string|email',
            age: 'required|integer|max:25',
            mark: 'required|integer|between:80,90',
            note: 'optional|string',
            status: 'enum:pending,processed,cancel'
        }
        );

        validator.validateSync();
        const isError = validator.hasError();
        const errors = validator.getAllErrors();

        expect(errors).does.not.have.property('username');
        expect(errors).have.property('password');
        expect(errors).have.property('email');
        expect(errors).have.property('age');
        expect(errors).have.property('mark');
        expect(errors).have.property('note');

        expect(validator.hasError('email')).to.be.true;
        expect(validator.hasError('password')).to.be.true;
        expect(validator.hasError('age')).to.be.true;
        expect(validator.hasError('mark')).to.be.true;
        expect(validator.hasError('status')).to.be.true;

        expect(validator.getError('email')).to.equal('The email field must be a valid email');
        expect(validator.getError('password')).to.equal('The password field must be have minimum length of 6');
        expect(validator.getError('age')).to.equal('The age field must be an integer');
        expect(validator.getError('mark')).to.equal('The mark field must have length between 80 and 90');
        expect(validator.getError('status')).to.equal('The status field must be either one of these options pending,processed,cancel')

        expect(validator.getAllErrors('email')).have.lengthOf(1);
        expect(validator.getAllErrors('password')).have.lengthOf(1);
        expect(validator.getAllErrors('age')).have.lengthOf(1);
        expect(validator.getAllErrors('mark')).have.lengthOf(1);
        
        expect(errors.password).have.lengthOf(1);
        expect(errors.email).have.lengthOf(1);
        expect(errors.age).have.lengthOf(1);
        expect(errors.note).have.lengthOf(1);
        expect(errors.mark).have.lengthOf(1);
        expect(isError).to.be.true;
    });
});
