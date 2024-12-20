import EvmService from "@domain/chain/evm/evm.service";
import IChainService from "@domain/chain/interface";
// import NonEvmService from "@domain/chain/non-evm/non-evm.service";
import { BadRequestError } from "@shared/lib/http/httpError";

class ChainServiceManager {
    private evmService: EvmService;
    // private nonEvmService: NonEvmService;

    constructor() {
        this.evmService = new EvmService();
        // this.nonEvmService = new NonEvmService();
    }

    getChainService(chainId: number): IChainService {
        const service = this.evmService.getService(chainId);
        if (service) return service;

        // service = this.nonEvmService.getService(chainId);
        // if (service) return service;

        throw new BadRequestError("Chain not supported");
    }
}

export default ChainServiceManager;
