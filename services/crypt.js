const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hashPassword: async (password) => await bcrypt.hash(password, saltRounds),
    comparePassword: async (password, hash) => await bcrypt.compare(password, hash)
}