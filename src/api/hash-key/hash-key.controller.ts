import { OkResponse } from "@shared/decorators/response";
import { NextFunction, Request, Response } from "express";

import hashKeyService from "./hash-key.service";

class HashKeyController {
    @OkResponse()
    async devidePrivateKey(_req: Request, _res: Response, _next: NextFunction) {
        return hashKeyService.devidePrivateKey(_req.body.privateKey);
    }

    @OkResponse()
    async mergePrivateKey(req: Request, _res: Response, _next: NextFunction) {
        const { shareX, shareY } = req.body;

        return hashKeyService.mergePrivateKey([shareX, shareY]);
    }

    @OkResponse()
    async renewPrivateKey(req: Request, _res: Response, _next: NextFunction) {
        const { shareX, shareY } = req.body;

        return hashKeyService.renewPrivateKey([shareX, shareY]);
    }
}

const hashKeyController = new HashKeyController();
export default hashKeyController;
