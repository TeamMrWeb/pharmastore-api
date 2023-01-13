const { User, Product, user_cart } = require('../database/models')

module.exports = {
    getAll: async () =>
        await user_cart.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Product,
                },
            ],
        }),
    findById: async (id) => await user_cart.findByPk(id),
    finByUserId: async (userId) =>
        await user_cart.findAll({ where: { userId }, include: [Product] }),
    create: async (data) => await user_cart.create(data),
    findByUserIdAndProductId: async (userId, productId) =>
        await user_cart.findOne({ where: { userId, productId } }),
    delete: async (id) => await user_cart.destroy({ where: { id } }),
    update: async (id, data) => await user_cart.update(data, { where: { id } }),
}
