const jwt = require('jsonwebtoken');
const moment = require('moment');
const errorObject = require('../helpers/errorObject');

const { Token } = require('../database/models');
const ErrorObject = require('../helpers/errorObject');
const tokens = require('../config').tokens

module.exports = {
    generateToken: ({
        userId,
        expires,
        type,
        secret = tokens.secret
    }) => jwt.sign({
            userId,
            createdAt: new Date(),
            expires: expires.toDate(),
            type
        }, secret),
    
    saveToken: async ({
        token,
        userId,
        type,
        blacklisted = false,
        expires
    }) => {
        return await Token.create({
            token,
            userId,
            type,
            blacklisted,
            expiresAt: expires.toDate()
        });
    },

    verifyToken: async ({ token, type }) => {
        try {
            const decoded = jwt.verify(token, tokens.accessToken.secret);
            const tokenRecord = await Token.findOne({ where: {
                token,
                type,
                userId: decoded.userId,
                blacklisted: false
            }});
            if (!tokenRecord) throw new errorObject({ message: "Token not found", statusCode: 404 });
            return decoded;
        } catch (err) {
            if (err.name === 'JsonWebTokenError')
                throw new errorObject({ statusCode: 400, message: err.message });
            throw err
        }
    },

    generateNeccessaryTokens: async (userId) => {
        const accessTokenEx = moment().add(parseInt(tokens.accessToken.expires), 'minutes')
        const accessToken = module.exports.generateToken({ userId, expires: accessTokenEx, type: 'access', secret: tokens.accessToken.secret});
        await module.exports.saveToken({ token: accessToken, userId, expires: accessTokenEx, type: 'access' });

        const refreshTokenEx = moment().add(parseInt(tokens.refreshToken.expires), 'days')
        const refreshToken = module.exports.generateToken({ userId, expires: refreshTokenEx, type: 'refresh', secret: tokens.refreshToken.secret});
        await module.exports.saveToken({ token: refreshToken, userId, expires: refreshTokenEx, type: 'refresh' });

        return {
            access: { token: accessToken, expires: accessTokenEx.toDate() },
            refresh: { token: refreshToken, expires: refreshTokenEx.toDate() }
        }
    }
}  