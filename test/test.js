const expect = require('chai').expect;
const Validation = require('../index');

it('validate require and min validation that produce min validation error', function() {
    let validator = new Validation({ name: 's' }, { name: 'required|min:2' });

    validator.validate();
    const isError = validator.hasError();
    const errors = validator.getAllErrors();

    expect(isError).to.be.true;
    expect(isError).to.be.a('boolean');
    expect(errors).to.have.property('name');
    expect(errors.name).to.be.an('array').have.lengthOf(1);
    expect(errors.name[0]).to.be.equal('Minimum length of this field is 2');
});

it('validate required and max that produce max validation error', function() {
    let validator = new Validation({ name: 'surya herdiyanto' }, { name: 'required|max:5' });

    validator.validate();
    const isError = validator.hasError();
    const errors = validator.getAllErrors();

    expect(isError).to.be.true;
    expect(isError).to.be.a('boolean');
    expect(errors).to.have.property('name');
    expect(errors.name).to.be.an('array').have.lengthOf(1);
    expect(errors.name[0]).to.be.equal('Maximum length of this field is 5');
});

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