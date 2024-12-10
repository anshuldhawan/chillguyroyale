const { InvalidInputError } = require('../errors/invalid_input_error');
const { UnauthorizedUserError } = require('../errors/unauthorized_user_error');
const Users = require('../model/Users');

module.exports = {
  requesterShouldMatchUserFromParam: async (req, res, next) => {
    req.userFromParam = await Users.findById(req.params.id).select('-password');

    if (!req.userFromParam) {
      throw new InvalidInputError('User Not Found', req.user.id, req.params, req.body);
    }

    if (!req.user
      || !req.userFromParam || req.userFromParam._id.toString() !== req.user?._id.toString()) {
      return next(new UnauthorizedUserError('Users can only update their own data.', req.user, req.params));
    }

    return next();
  },

  requesterShouldBeAdminOrMatchUserFromParam: async (req, res, next) => {
    req.userFromParam = await Users.findById(req.params.id).select('-password');

    if (!req.userFromParam) {
      throw new InvalidInputError('User Not Found', req.user.id, req.params, req.body);
    }

    if (req.user.is_admin || req.user.sub_admin) return next();

    if (req.userFromParam._id.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedUserError('Users can only access their own data.', req.user, req.params);
    }

    return next();
  },

  requesterShouldBeAdminOrSubadmin: async (req, res, next) => {
    if (req.user.sub_admin || req.user.is_admin) {
      return next();
    }
    return next(new UnauthorizedUserError('only Admin and Subadmin are allowed to access', req.user, req.params));
  },

  requesterShouldBeAdmin: async (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
      return next(new UnauthorizedUserError('only Admin are allowed to access', req.user, req.params));
    }

    return next();
  },
};
