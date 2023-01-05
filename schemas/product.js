module.exports = {
    create: {
        name: {
            in: ['body'],
            isString: { errorMessage: 'Name must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Name must be at least 2 characters long' },
            exists: { errorMessage: 'Name is required' },
        },
        description: {
            in: ['body'],
            isString: { errorMessage: 'Description must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Description must be at least 2 characters long' },
            exists: { errorMessage: 'Description is required' },
        },
        price: {
            in: ['body'],
            isInt: { errorMessage: 'Price must be an integer' },
            exists: { errorMessage: 'Price is required' },
        },
        categoryId: {
            in: ['body'],
            isInt: { errorMessage: 'CategoryId must be an integer' },
            exists: { errorMessage: 'CategoryId is required' },
        },
        inventoryId: {
            in: ['body'],
            isInt: { errorMessage: 'InventoryId must be an integer' },
            exists: { errorMessage: 'InventoryId is required' },
        },
        discountId: {
            in: ['body'],
            isInt: { errorMessage: 'discountId must be an integer' },
            exists: { errorMessage: 'discountId is required' },
        },
        rating: {
            in: ['body'],
            isInt: { errorMessage: 'Rating must be an integer' },
            exists: { errorMessage: 'Rating is required' },
        },
        image: {
            in: ['body'],
            isString: { errorMessage: 'Image must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Image must be at least 2 characters long' },
            exists: { errorMessage: 'Image is required' },
        },
    },
    update: {
        name: {
            in: ['body'],
            isString: { errorMessage: 'Name must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Name must be at least 2 characters long' },
            exists: { errorMessage: 'Name is required' },
        },
        description: {
            in: ['body'],
            isString: { errorMessage: 'Description must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Description must be at least 2 characters long' },
            exists: { errorMessage: 'Description is required' },
        },
        price: {
            in: ['body'],
            isInt: { errorMessage: 'Price must be an integer' },
            exists: { errorMessage: 'Price is required' },
        }
    }
}