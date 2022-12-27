const { Product, product_category, product_inventory, product_discount } = require('../database/models');
const models = require('../database/models');

module.exports = {
    get: async({ page = 0, limit = 10}) => {
        return await Product.findAll({
            include: [
                { model: product_category, attributes: ['name', 'description'] },
                { model: product_inventory, attributes: ['quantity'] },
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
}