module.exports = {
    create: {
        firstName: {
            in: ['body'],
            isString: { errorMessage: 'First name must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'First name must be at least 2 characters long' },
            exists: { errorMessage: 'First name is required' },
        },
    }
}