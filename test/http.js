const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('express integration', function() {
    it('test validation fail with response code 425', function() {
        chai.request('http://localhost:3000')
            .post('/validation')
            .send({
                username: 'johndoe',
                email: 'jogndoe.com',
                age: '',
                description: 123123
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.be.equal(425);
                expect(response.body).have.property('email').have.lengthOf(1);
                expect(response.body).have.property('age').have.lengthOf(2);
                expect(response.body).have.property('description').have.lengthOf(1);
                expect(response.body.email[0]).to.be.equal('This field must be a valid email');
                expect(response.body.age[0]).to.be.equal('This field is required');
                expect(response.body.age[1]).to.be.equal('This field must be an integer');
                expect(response.body.description[0]).to.be.equal('This field must be a string');
            });
    });

    it('test validation success with response code 200', function() {
        chai.request('http://localhost:3000')
            .post('/validation')
            .send({
                username: 'johndoe',
                email: 'my@johndoe.com',
                age: 20,
                description: 'this is a sample description'
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.be.equal(200);
                expect(response.text).to.be.equal('validator testing');
            });
    })
});