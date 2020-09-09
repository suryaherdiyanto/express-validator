const expect = require('chai').expect;
const { Validator } = require('../index');

exports.testRequired = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.required('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.required('test')).to.be.a('boolean').to.be.true;
    }
}

exports.testMax = function(sample, max, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.max('test', max)).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.max('test', max)).to.be.a('boolean').to.be.true;
    }
}

exports.testMin = function(sample, min, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.min('test', min)).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.min('test', min)).to.be.a('boolean').to.be.true;
    }
}

exports.testString = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.string('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.string('test')).to.be.a('boolean').to.be.true;
    }
}

exports.testNumeric = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.numeric('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.numeric('test')).to.be.a('boolean').to.be.true;
    }
}

exports.testAlpha = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.alpha('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.alpha('test')).to.be.a('boolean').to.be.true;
    }
}

exports.testAlphaNumeric = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.alpha_numeric('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.alpha_numeric('test')).to.be.a('boolean').to.be.true;
    }
}

exports.testEmail = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.email('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.email('test')).to.be.a('boolean').to.be.true;
    }
}

exports.testInteger = function(sample, opp = false) {
    let validator = new Validator();
    validator.build({ test: sample });

    if (!opp) {
        expect(validator.rules.integer('test')).to.be.a('boolean').to.be.false;
    } else {
        expect(validator.rules.integer('test')).to.be.a('boolean').to.be.true;
    }
}