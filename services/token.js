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
    }

}  