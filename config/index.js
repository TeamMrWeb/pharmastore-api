require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    tokens: {
        secret: process.env.TOKEN_SECRET,
        accessToken: {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expires: process.env.ACCESS_TOKEN_LIFE
        },
        refreshToken: {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expires: process.env.REFRESH_TOKEN_LIFE
        },
        emailToken: {
            secret: process.env.EMAIL_TOKEN_SECRET,
            expires: process.env.EMAIL_TOKEN_LIFE
        }
    },
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT,
        jwtSecret: process.env.JWT_SECRET || 'Supersecret',
        jwtExpire: process.env.JWT_EXPIRE || '1h',
    },
}