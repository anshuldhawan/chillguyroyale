const Joi = require('joi');

function validateSignInFields(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  const result = schema.validate(user);
  return result;
}

module.exports = {
  validateSignInFields
};
