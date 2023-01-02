const { product_discount }= require('../database/models');

module.exports = {
    findDiscountById: async (id) => await product_discount.findByPk(id)
}