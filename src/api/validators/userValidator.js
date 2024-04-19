import { celebrate, Joi, Segments } from 'celebrate';
import role from './utils/role.js';

const createUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().max(25).required(),
    password: Joi.string().required(),
    role: role.optional(),
  }),
});

const getUser = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

const getUsers = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  }),
});

const updateUser = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),

  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(25).required(),
    password: Joi.string().optional(),
    role: role.required(),
  }),
});

const deleteUser = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

export default { createUser, getUser, updateUser, deleteUser, getUsers };