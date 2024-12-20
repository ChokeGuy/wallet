import { CreatedResponse, OkResponse } from "@shared/decorators/response";
import { NextFunction, Request, Response } from "express";

import walletService from "./wallet.service";

class WalletController {
    @CreatedResponse()
    async createWallet(_req: Request, _res: Response, _next: NextFunction) {
        return walletService.createWallet(_req.body);
    }

    @OkResponse()
    async importWallet(_req: Request, _res: Response, _next: NextFunction) {
        return walletService.importWallet(_req.body);
    }
}

const walletController = new WalletController();

export default walletController;
