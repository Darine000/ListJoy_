const Joi = require("joi");

const schemas = {
  createList: Joi.object({
    name: Joi.string().required(),
    items: Joi.array().items(Joi.string()),
  }),
  updateList: Joi.object({
    name: Joi.string(),
    items: Joi.array().items(Joi.string()),
  }),
};

exports.validateDto = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
