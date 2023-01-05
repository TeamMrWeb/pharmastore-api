const {
    Product,
    product_category,
    product_inventory,
    product_discount,
} = require('../database/models');

const { Op } = require('sequelize');
const errorObject = require('../helpers/errorObject');

const categoryService = require('./category');
const inventoryService = require('./inventory');
const discountService = require('./discount');

module.exports = {
    get: async({ page = 0, limit = 10, category, rating, name }) => {
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
                },
                'images'
            ],
            offset: page * limit,
            limit: limit
        })
    },
    create: async (payload) => await Product.create(payload),
    validateProduct: async (payload) => {
        try{
            const categoryId = await categoryService.findCategoryById(payload.categoryId);
            if(!categoryId) throw new Error('CategoryId doesnt exists');
            const inventoryId = await inventoryService.findInventoryById(payload.inventoryId);
            if(!inventoryId) throw new Error('InventoryId doesnt exists');
            const discountId = await discountService.findDiscountById(payload.discountId);
            if(!discountId) throw new Error('DiscountId doesnt exists');
                } catch(err) {
            throw new errorObject({ statusCode: 404, message: err.message });
        }
    },
    getAttributes: async () => await Object.keys(Product.rawAttributes),
    update: async (id, payload) => await Product.update(payload, { where: { id } })
}