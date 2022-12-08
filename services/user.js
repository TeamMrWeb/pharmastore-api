const { User } = require('../database/models');

module.exports = {
    getAll: async () => await User.findAll()
}