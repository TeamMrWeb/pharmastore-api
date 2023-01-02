const { product_category }= require('../database/models');

module.exports = {
    getAll: async () => await product_category.findAll(),
    findCategoryById: async (id) => await product_category.findByPk(id),
    create: async (payload) => await product_category.create(payload),
}