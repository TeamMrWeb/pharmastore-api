const errorObject = require('../helpers/errorObject');

const userService = require('../services/user');
const cryptService = require('../services/crypt');
const tokenService = require('../services/token');

const tokens = require('../config').tokens;

module.exports = {
    login: async (email, password) => {
        const user = await userService.getByEmail(email);
        if (!user) throw new errorObject({ statusCode: 403, message: 'User not found' });
        const isPasswordValid = cryptService.comparePassword(password, user.password);
        if (!isPasswordValid) throw new errorObject({ statusCode: 400, message: 'Invalid credentials' });
        return {
            accessToken: tokenService.generateToken({
                payload: { id: user.id },
                expires: tokens.accessToken.expires,
                type: 'access'
            }),
            refreshToken: tokenService.generateToken({
                payload: { id: user.id },
                expires: tokens.refreshToken.expires,
                type: 'refresh'
            })
        };
    }
}