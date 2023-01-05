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
        }
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
        }
    }
}