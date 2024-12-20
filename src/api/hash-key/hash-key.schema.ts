import { validatePrivateKey } from "@shared/utils/validate";
import Joi from "joi";

import { Share } from "./hash-key.type";

const devidePrivateKey = Joi.object({
    privateKey: Joi.string().custom(validatePrivateKey).required().messages({
        "any.custom": `Invalid private key`,
        "any.required": `"privateKey" is a required field`,
    }),
});

const shareSchema = Joi.object<Share>({
    key: Joi.object()
        .pattern(Joi.string(), Joi.number().min(0).max(255))
        .required()
        .messages({
            "object.base": "key must be an object",
            "object.pattern": "key values must be numbers between 0 and 255",
            "any.required": '"key" is a required field',
        }),
    type: Joi.valid("a", "b", "c").required().messages({
        "any.only": 'type must be one of "a", "b", or "c"',
        "any.required": '"type" is a required field',
    }),
});

const mergePrivateKey = Joi.object({
    shareX: shareSchema.required().messages({
        "any.custom": `Invalid share X`,
        "any.required": `"shareX" is a required field`,
    }),
    shareY: shareSchema.required().messages({
        "any.custom": `Invalid share Y`,
        "any.required": `"shareY" is a required field`,
    }),
});

const renewPrivateKey = mergePrivateKey;

const hashKeySchema = {
    devidePrivateKey,
    mergePrivateKey,
    renewPrivateKey,
};

export default hashKeySchema;
