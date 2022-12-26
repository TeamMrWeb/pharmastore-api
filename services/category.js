const { product_category }= require('../database/models');

module.exports = {
    getAll: async () => await product_category.findAll(),
}