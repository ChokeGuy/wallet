import { ChainId } from "@shared/constant/chain-id";
import { BadRequestError } from "@shared/lib/http/httpError";
import { JsonRpcProvider } from "ethers";

function getEvmByChain(chainId: number): JsonRpcProvider {
    const rpcUrls: Record<number, string> = {
        [ChainId.ETHEREUM]: "https://eth.drpc.org",
        [ChainId.POLYGON]: "https://polygon-rpc.com",
        [ChainId.AVAX_MAINNET]: "https://api.avax.network/ext/bc/C/rpc",
        [ChainId.BNB_MAINNET]: "https://bsc-dataseed.binance.org/",
    };

    const rpcUrl = rpcUrls[chainId];

    if (!rpcUrl) {
        throw new BadRequestError(`RPC URL not found for chainId ${chainId}`);
    }

    return new JsonRpcProvider(rpcUrl);
}

function getNonEvmByChain(_chainId: number) {}

export { getEvmByChain, getNonEvmByChain };
