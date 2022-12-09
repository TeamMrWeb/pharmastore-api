module.exports = {
    create: {
        firstName: {
            in: ['body'],
            isString: { errorMessage: 'First name must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'First name must be at least 2 characters long' },
            exists: { errorMessage: 'First name is required' },
        },
        lastName: {
            in: ['body'],
            isString: { errorMessage: 'Last name must be a string' },
            isLength: { options: { min: 2 }, errorMessage: 'Last name must be at least 2 characters long' },
            exists: { errorMessage: 'Last name is required' },
        },
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
        },
        telephone: {
            in: ['body'],
            isInt: { errorMessage: 'Telephone must be an integer' },
            isLength: { options: { min: 10 }, errorMessage: 'Telephone must be at least 10 characters long' },
            exists: { errorMessage: 'Telephone is required' },
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