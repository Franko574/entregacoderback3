import Joi from "joi";

export const productDto = Joi.object({
    first_name : Joi.string().required(),
    last_name : Joi.string().required(),
    email : Joi.string().required(),
    age : Joi.string().required(),
    password : Joi.string().required(),
    role : Joi.string().required(),
});