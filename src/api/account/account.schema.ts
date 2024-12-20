import Joi from "joi";

const createAccount = Joi.object({
    userId: Joi.object().id().required(),
    name: Joi.string().required(),
});

const accountSchema = {
    createAccount,
};

export default accountSchema;
