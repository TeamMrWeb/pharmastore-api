require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
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