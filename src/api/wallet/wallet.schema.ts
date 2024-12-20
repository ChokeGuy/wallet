import { ChainId } from "@shared/constant/chain-id";
import Joi from "joi";

const createWallet = Joi.object({
    userId: Joi.object().id().required(),
    accountId: Joi.object().id().required,
    chainId: Joi.number()
        .valid(...Object.values(ChainId))
        .default(ChainId.ETHEREUM),
    aa: Joi.boolean(),
});

const importWallet = Joi.object({
    name: Joi.string().default(""),
    chainId: Joi.number()
        .valid(...Object.values(ChainId))
        .default(ChainId.ETHEREUM),
    privateKey: Joi.string().required(),
});

const walletSchema = {
    createWallet,
    importWallet,
};

export default walletSchema;
