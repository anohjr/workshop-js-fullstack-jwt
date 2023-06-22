const joi = require("joi");

const userSchema = joi.object({
    username: joi.string().min(2).required(),
    email: joi.string().email().required(),
    role: joi.string().valid("ROLE_USER", "ROLE_ADMIN").required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi.ref("password")
}).with('password', 'repeat_password');

module.exports = userSchema;