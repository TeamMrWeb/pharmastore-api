const errorObject = require('../helpers/errorObject');


const discountService = require('../services/discount');

module.exports = {
   discountIdExists: async (id) => {
        try{
            const discountId = await discountService.findDiscountById(id);
            if(!discountId) throw new errorObject({ statusCode: 404, message: 'DiscountId doesnt exists' });
        } catch(err) {
            //console.log(err);
            return err;
        }
        
    }
}