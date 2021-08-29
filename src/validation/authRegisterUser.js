import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(
      new Error(
        "Invalid username - must be between 3 and 30 alphanumeric characters."
      )
    ),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .error(new Error("Invalid password - must be at least 6 characters.")),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .error(new Error("Invalid email - email must be a valid email.")),
  emailOptIn: Joi.boolean(),
});

export default schema;
