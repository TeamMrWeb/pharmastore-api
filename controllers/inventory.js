const errorObject = require('../helpers/errorObject');


const inventoryService = require('../services/inventory');

module.exports = {
   inventoryIdExists: async (id) => {
        try{
            const inventoryId = await inventoryService.findInventoryById(id);
            if(!inventoryId) throw new errorObject({ statusCode: 404, message: 'InventoryId doesnt exists' });
        } catch(err) {
           // console.log(err);
            return err;
        }
        
    }
}