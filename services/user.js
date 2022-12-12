const { User } = require('../database/models');

module.exports = {
    create: async (payload) => await User.create(payload),
    getAll: async () => await User.findAll(),
    getById: async (id) => await User.findByPk(id),
    getByEmail: async (email) => await User.findOne({ where: { email } }),
}