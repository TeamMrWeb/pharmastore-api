const { product_inventory }= require('../database/models');

module.exports = {
    findInventoryById: async (id) => await product_inventory.findByPk(id)
}