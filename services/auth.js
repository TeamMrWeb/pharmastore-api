const errorObject = require('../helpers/errorObject');
const moment = require('moment');

const userService = require('../services/user');
const cryptService = require('../services/crypt');
const tokenService = require('../services/token');

const tokens = require('../config').tokens;

module.exports = {

    generateNeccessaryTokens: async (userId) => {
        const accessTokenEx = moment().add(tokens.accessToken.expires, 'minutes')
        const refreshTokenEx = moment().add(tokens.refreshToken.expires, 'minutes')
        console.log(accessTokenEx.toDate(), refreshTokenEx.toDate())
        const accessToken = tokenService.generateToken({ userId, expires: accessTokenEx, type: 'access' });
        await tokenService.saveToken({ token: accessToken, userId, expires: accessTokenEx, type: 'access' });
        const refreshToken = tokenService.generateToken({ userId, expires: refreshTokenEx, type: 'refresh' });
        await tokenService.saveToken({ token: refreshToken, userId, expires: refreshTokenEx, type: 'refresh' });
        return {
            access: { token: accessToken, expires: tokens.accessToken.expires },
            refresh: { token: refreshToken, expires: tokens.refreshToken.expires }
        }
    },

    login: async (email, password) => {
        const user = await userService.getByEmail(email, false);
        if (!user) throw new errorObject({ statusCode: 403, message: 'User not found' });
        const isPasswordValid = cryptService.comparePassword(password, user.password);
        if (!isPasswordValid) throw new errorObject({ statusCode: 400, message: 'Invalid credentials' });
        console.log('asd')
        const data = await module.exports.generateNeccessaryTokens(user.id);
        return data;
    }
}