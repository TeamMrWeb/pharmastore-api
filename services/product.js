const { Product, product_category, product_inventory, product_discount } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    get: async({ page = 0, limit = 10, category, rating }) => {
        return await Product.findAll({
            where: rating ? { rating: { [Op.gte]: rating } } : {},
            include: [
                {
                    model: product_category, attributes: ['name', 'description'],
                    where: category ? { name: { [Op.like]: `%${category}%` } } : {}
                },
                {
                    model: product_inventory,
                    attributes: ['quantity'],
                    where: { quantity: { [Op.gt]: 0 } }
                },
                {
                    model: product_discount,
                    attributes: ['name', 'description', 'percent'],
                    where: { active: true }
                }
            ],
            offset: page * limit,
            limit: limit
        })
    },
    create: async (payload) => await Product.create(payload),
    findCategoryById: async (id) => await product_category.findByPk(id),
}