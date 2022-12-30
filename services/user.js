const { User, Roles } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    get: async({ page = 0, limit = 10}) => await User.findAll({
        offset: page * limit, limit,
        attributes: { exclude: ['password'] },
        include: { model: Roles, attributes: ['name'] }
    }),
    getOne: async (id) => await User.findByPk(id, { attributes: { exclude: ['password'] }, include: { model: Roles, attributes: ['name'] }}),
    create: async (payload) => await User.create(payload),
    getAll: async () => await User.findAll({ attributes: { exclude: ['password'] } }),
    getById: async (id) => await User.findByPk(id),
    getByEmail: async (email, secure=True) => await User.findOne({ where: { email }, attributes: secure? { exclude: ['password'] } : null }),
    getByName: async({ page = 0, limit = 10, firstName, lastName }) => await User.findAll({
            attributes: { exclude: ['password'] },
            where: { [Op.or]: 
                [{firstName: { [Op.like]: `%${firstName}%` }},
                {lastName: { [Op.like]: `%${lastName}%` }}]
            },
            offset: page * limit,
            limit: limit
        })
}