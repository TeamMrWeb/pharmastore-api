const jwt = require('jsonwebtoken');

const tokens = require('../config').tokens

module.exports = {
    generateToken: ({
        payload = {},
        expires,
        type,
        secret = tokens.secret
    }) => {
        return jwt.sign({... payload, expires: Date.now() + parseInt(expires), type}, secret)
    },
}