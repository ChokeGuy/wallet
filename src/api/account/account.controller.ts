import { CreatedResponse } from "@shared/decorators/response";
import { NextFunction, Request, Response } from "express";

import accountService from "./account.service";

class AccountController {
    @CreatedResponse()
    async createAccount(_req: Request, _res: Response, _next: NextFunction) {
        return accountService.createAccount(_req.body);
    }
}

const accountController = new AccountController();

export default accountController;
