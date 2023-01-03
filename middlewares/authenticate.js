const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

 const tokenService = require('../services/token');

module.exports = {
    authenticate: catchAsync(
        async(req, res, next) => {
            try {
                const auth = req.headers.authorization;
                if(!auth) throw new errorObject({ message: 'No token provided', statusCode: 400})
                const token = auth.split(" ")[1];
                const payload = await tokenService.verifyToken({ token, type: "access" });
                req.payload = payload;
                next();
            } catch (err) {
                console.log(err)
                next(createHttpError(err.statusCode,`[Error on authenticate] ${err.message}`));
            }
        }
    )
}