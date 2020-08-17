const expect = require('chai').expect;
const Validation = require('../index');

exports.testRequired = function(sample, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.required('test')).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.required('test')).to.be.a('boolean').to.be.false;
    }
}

exports.testMax = function(sample, max, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.max('test', max)).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.max('test', max)).to.be.a('boolean').to.be.false;
    }
}

exports.testMin = function(sample, min, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.min('test', min)).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.min('test', min)).to.be.a('boolean').to.be.false;
    }
}

exports.testString = function(sample, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.string('test')).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.string('test')).to.be.a('boolean').to.be.false;
    }
}

exports.testNumeric = function(sample, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.numeric('test')).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.numeric('test')).to.be.a('boolean').to.be.false;
    }
}

exports.testAlpha = function(sample, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.alpha('test')).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.alpha('test')).to.be.a('boolean').to.be.false;
    }
}

exports.testEmail = function(sample, opp = false) {
    let validator = new Validation({ test: sample });

    if (!opp) {
        expect(validator.rules.email('test')).to.be.a('boolean').to.be.true;
    } else {
        expect(validator.rules.email('test')).to.be.a('boolean').to.be.false;
    }
}