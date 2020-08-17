const expect = require('chai').expect;
const { testRequired, testMax, testMin } = require('./unit');
const Validation = require('../index');

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

    it('test max rule with sample data type is number return true if null passed', function() {
        testMax(null, 10);
    });
    it('test max rule with sample data type is number return true if undfined passed', function() {
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

    it('test min rule with sample data type is number return true if null passed', function() {
        testMax(null, 10);
    });
    it('test min rule with sample data type is number return true if undfined passed', function() {
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
});

describe('testing validator must working properly', function() {
    it('validate required if none passed', function() {
        let validator = new Validation({ name: '' }, { name: 'required' });
    
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
        let validator = new Validation({ name: 'surya' }, { name: 'required|max:5|min:2' });
        
        validator.validate();
        const isError = validator.hasError();
    
        expect(isError).to.equal(false);
        expect(isError).to.be.a('boolean');
        expect(validator.getAllErrors()).not.have.property('name');
    });
});
