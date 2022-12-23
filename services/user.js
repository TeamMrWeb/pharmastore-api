const { User } = require('../database/models');

module.exports = {
    get: async({ page = 0, limit = 10}) => await User.findAll({ offset: page * limit, limit, attributes: { exclude: ['password'] } }),
    create: async (payload) => await User.create(payload),
    getAll: async () => await User.findAll({ attributes: { exclude: ['password'] } }),
    getById: async (id) => await User.findByPk(id),
    getByEmail: async (email, secure=True) => await User.findOne({ where: { email }, attributes: secure? { exclude: ['password'] } : null }),
}