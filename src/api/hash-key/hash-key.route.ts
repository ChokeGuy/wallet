import { validator } from "@shared/middlewares/validator";
import { asyncWrapper } from "@shared/utils/asyncWrapper";
import express from "express";

import hashKeyController from "./hash-key.controller";
import hashKeySchema from "./hash-key.schema";

const hashKeyRouter = express.Router();

hashKeyRouter.post(
    "/devide",
    validator({
        body: hashKeySchema.devidePrivateKey,
    }),
    asyncWrapper(hashKeyController.devidePrivateKey),
);

hashKeyRouter.post(
    "/merge",
    validator({
        body: hashKeySchema.mergePrivateKey,
    }),
    asyncWrapper(hashKeyController.mergePrivateKey),
);

hashKeyRouter.post(
    "/renew",
    validator({
        body: hashKeySchema.renewPrivateKey,
    }),
    asyncWrapper(hashKeyController.renewPrivateKey),
);

export default hashKeyRouter;
