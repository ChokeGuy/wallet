import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import walletController from "./wallet.controller";
import walletSchema from "./wallet.schema";

const walletRouter = express.Router();

walletRouter.post(
    "/create",
    validator({
        body: walletSchema.createWallet,
    }),
    asyncWrapper(walletController.createWallet),
);
walletRouter.post(
    "/import",
    validator({
        body: walletSchema.importWallet,
    }),
    asyncWrapper(walletController.importWallet),
);

export default walletRouter;
