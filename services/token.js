const jwt = require('jsonwebtoken');
const moment = require('moment');

const { Token } = require('../database/models');
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


    generateNeccessaryTokens: async (userId) => {
        const accessTokenEx = moment().add(parseInt(tokens.accessToken.expires), 'minutes')
        const accessToken = module.exports.generateToken({ userId, expires: accessTokenEx, type: 'access' });
        await module.exports.saveToken({ token: accessToken, userId, expires: accessTokenEx, type: 'access' });

        const refreshTokenEx = moment().add(parseInt(tokens.refreshToken.expires), 'days')
        const refreshToken = module.exports.generateToken({ userId, expires: refreshTokenEx, type: 'refresh' });
        await module.exports.saveToken({ token: refreshToken, userId, expires: refreshTokenEx, type: 'refresh' });

        return {
            access: { token: accessToken, expires: accessTokenEx.toDate() },
            refresh: { token: refreshToken, expires: refreshTokenEx.toDate() }
        }
    }
}  