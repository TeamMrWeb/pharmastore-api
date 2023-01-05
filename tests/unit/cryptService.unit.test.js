// const request = require('supertest');
const expect = require('chai').expect;

const cryptService = require('../../services/crypt');

describe('UNIT TEST', () => {
    describe('CRYPT SERVICE', () => {
        it('should encrypt and compare encrypted str', async () => {
            const string = 'test';
            const encryptedString = await cryptService.hashPassword(string);
            const decryptedString = await cryptService.comparePassword(string, encryptedString);
            expect(decryptedString).to.be.true;
        });
    });
});