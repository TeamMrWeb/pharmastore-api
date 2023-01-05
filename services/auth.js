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
    refresh: async (accessToken, refreshToken) => {
        const accessPayload = await tokenService.verifyToken({ token: accessToken, type: 'access' });
        if (accessPayload.type !== 'access') throw new errorObject({ statusCode: 400, message: 'Invalid token access type' });
        const refreshPayload = await tokenService.verifyToken({ token: refreshToken, type: 'refresh' });
        if (refreshPayload.type !== 'refresh') throw new errorObject({ statusCode: 400, message: 'Invalid refresh token type' });
        await tokenService.blacklistToken(refreshToken);
        await tokenService.blacklistToken(accessToken);
        const tokens = await tokenService.generateNeccessaryTokens(accessPayload.userId);
        return tokens;
    }
}