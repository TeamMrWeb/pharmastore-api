const request = require('supertest');
const expect = require('chai').expect;

const app = require('../../app');
let token = '';

describe('ROL INTEGRATION TEST', () => {

    before(async () => {
        const res = await request(app).post('/v1/auth/login').send({
            email: 'jeffbezos@gmail.com',
            password: '123456'
        });
        token = res.body.body.tokens.access.token
    })

    describe('GET /', () => {
        it('should return 400 if no token is provided', async () => {
            const res = await request(app).get('/v1/rol');
            expect(res.status).to.be.equal(400);
        });
        it('should return 200 if token is provided', async () => {
            const res = await request(app).get('/v1/rol').set('Authorization', `Bearer ${token}`);
            expect(res.status).to.be.equal(200);
        });
    });
});
