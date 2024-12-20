import express from "express";

import accountRouter from "./account/account.route";
import hashKeyRouter from "./hash-key/hash-key.route";
import walletRouter from "./wallet/wallet.route";

const router = express.Router();
router.use("/hash-key", hashKeyRouter);
router.use("/wallet", walletRouter);
router.use("/account", accountRouter);

export default router;
