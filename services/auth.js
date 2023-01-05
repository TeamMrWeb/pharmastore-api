const errorObject = require('../helpers/errorObject');

const userService = require('../services/user');
const cryptService = require('../services/crypt');
const tokenService = require('../services/token');

module.exports = {
    login: async (email, password) => {
        const user = await userService.getByEmail(email, false);
        if (!user) throw new errorObject({ statusCode: 403, message: 'User not found' });
        const isPasswordValid = cryptService.comparePassword(password, user.password);
        if (!isPasswordValid) throw new errorObject({ statusCode: 400, message: 'Invalid credentials' });
        const tokens = await tokenService.generateNeccessaryTokens(user.id);
        return { user, tokens };
    },
    verifyToken: async (token, type) => {
        try {
            return await tokenService.verifyToken({ token, type });
        } catch (err) {
            throw new errorObject({ statusCode: 400, message: `Invalid ${type} token type` });
        }
    },
    logout: async (accessToken, refreshToken) => {
        await tokenService.blacklistToken(refreshToken);
        await tokenService.blacklistToken(accessToken);
    },
    refresh: async (accessToken, refreshToken) => {
        const accessPayload = await module.exports.verifyToken(accessToken, 'access');
        await module.exports.verifyToken(refreshToken, 'refresh');
        await tokenService.blacklistToken(refreshToken);
        await tokenService.blacklistToken(accessToken);
        const tokens = await tokenService.generateNeccessaryTokens(accessPayload.userId);
        return tokens;
    }
}