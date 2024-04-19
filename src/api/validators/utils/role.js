import { Joi } from "celebrate";

const roles = Joi.string().valid(
  // 'admin', La url no es correcta
  'films',
  'people',
  'locations',
  'species',
  'vehicles',
);

export default roles;