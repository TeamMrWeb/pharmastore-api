const { User, Roles } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    get: async({
            page = 0,
            limit = 10,
            firstName,
            lastName
        }) => await User.findAll({
            limit,
            offset: page * limit,
            attributes: { exclude: ['password'] },
            include: { model: Roles, attributes: ['name'] },
            where: {
                firstName: { [Op.like]: `%${firstName}%` },
                lastName: { [Op.like]: `%${lastName}%` }
            }
        }),
    getAttributes: async () => await Object.keys(User.rawAttributes),
    update: async (id, payload) => await User.update(payload, { where: { id } }),
    getOne: async (id) => await User.findByPk(id, { attributes: { exclude: ['password'] }, include: { model: Roles, attributes: ['name'] }}),
    create: async (payload) => await User.create(payload),
    getAll: async () => await User.findAll({ attributes: { exclude: ['password'] } }),
    getById: async (id) => await User.findByPk(id),
    getByEmail: async (email, secure=True) => await User.findOne({ where: { email }, attributes: secure? { exclude: ['password'] } : null }),
}