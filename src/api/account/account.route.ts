import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import { Router } from "express";

import accountController from "./account.controller";
import accountSchema from "./account.schema";

const accountRouter = Router();

accountRouter.post(
    "/create",
    validator({
        body: accountSchema.createAccount,
    }),
    asyncWrapper(accountController.createAccount),
);

export default accountRouter;
