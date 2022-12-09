module.exports = {
    create: {
        firstName: {
            in: ['body'],
            isString: { errorMessage: 'First name must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'First name must be at least 2 characters long' },
            exists: { errorMessage: 'First name is required' },
        },
    },
    login: {
        email: {
            in: ['body'],
            isEmail: { errorMessage: 'Email must be a valid email address' },
            exists: { errorMessage: 'Email is required' },
        },
        password: {
            in: ['body'],
            isString: { errorMessage: 'Password must be a string' },
            isLength: { options: { min: 6 }, errorMessage: 'Password must be at least 6 characters long' },
            exists: { errorMessage: 'Password is required' },
        }
    }
}