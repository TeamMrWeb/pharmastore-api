const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

const { ROLES } = require('../constants');
const userService = require('../services/user');

module.exports = {
    isAdmin: catchAsync(
        async(req, res, next) => {
            try {
                const payload = req.payload;
                if (!payload) throw new Error('Not authorizated');
                const user = await userService.getById(payload.userId);
                if (!user) throw new Error('User doesnt exists');
                const rolUser = user.roleId;
                const { id } = req.params;
                const targetId = parseInt(id);
                if (targetId === user.id)
                    return next();
                if(rolUser === ROLES.ADMIN)
                    return next();
                throw new Error('Not authorizated')
            } catch (err) {
                console.log(err)
                next(createHttpError(401,`[Error on user authenticate] ${err.message}`));
            }
        }
    )
}