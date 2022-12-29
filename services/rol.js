const { Roles } = require('../database/models');

module.exports = {
    getAll: async () => await Roles.findAll()
}