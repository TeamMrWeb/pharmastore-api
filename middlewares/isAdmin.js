const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

const { ROLES } = require('../constants');
const userService = require('../services/user');


module.exports = {
    isAdmin: catchAsync(
        async(req, res, next) => {
            try {
                // TODO: verify if user is admin
                const payload = req.payload;
                if(!payload) throw new Error('Not authorizated');
                //console.log(payload);
                const user = await userService.getById(payload.userId);
                //console.log(user);
                if(!user) throw new Error('User doesnt exists');
                const rolUser = user.roleId;
                console.log(rolUser);
                if(rolUser !== ROLES.ADMIN) throw new Error('Not authorizated');
                next();
            } catch (err) {
                console.log(err)
                next(createHttpError(err.statusCode,`[Error on user authenticate] ${err.message}`));
            }
        }
    )
}