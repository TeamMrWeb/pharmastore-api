const jwt = require('jsonwebtoken');
const moment = require('moment');

const tokens = require('../config').tokens

module.exports = {
    generateToken: ({
        payload = {},
        expires,
        type,
        secret = tokens.secret
    }) => jwt.sign({
            ... payload,
            expires: expires.unix(),
            type
        }, secret)
}  