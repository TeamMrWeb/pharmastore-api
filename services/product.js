const { Product } = require('../database/models');

module.exports = {
    get: async({ page = 0, limit = 10}) => await Product.findAll({ offset: page * limit, limit }),
    create: async (payload) => await Product.create(payload),
}