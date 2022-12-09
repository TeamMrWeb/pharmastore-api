const { User } = require('../database/models');

module.exports = {
    create: async (payload) => await User.create(payload),
    getAll: async () => await User.findAll()
}