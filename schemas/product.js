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
            isLength: { options: { min: 1 }, errorMessage: 'Price must be at least 1 characters long' },
            exists: { errorMessage: 'Price is required' },
        },
        quantity: {
            in: ['body'],
            isInt: { errorMessage: 'Quantity must be an integer' },
            isLength: { options: { min: 1 }, errorMessage: 'Quantity must be at least 1 characters long' },
            exists: { errorMessage: 'Quantity is required' },
        },
        category: {
            in: ['body'],
            isString: { errorMessage: 'Category must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Category must be at least 2 characters long' },
            exists: { errorMessage: 'Category is required' },
        },
        image: {
            in: ['body'],
            isString: { errorMessage: 'Image must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Image must be at least 2 characters long' },
            exists: { errorMessage: 'Image is required' },
        },
    },
}