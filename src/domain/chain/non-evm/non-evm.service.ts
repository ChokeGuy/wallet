// import { ChainId } from "@shared/constant/chain-id";
// import { BadRequestError } from "@shared/lib/http/httpError";
// import { HDNodeWallet, Provider } from "ethers";

// import IChainService from "../interface";

// class NonEvmService implements IChainService {
//     chainId: number | undefined;
//     provider!: Provider;
//     wallet!: HDNodeWallet;
//     private supportedChains: number[] = [
//         ChainId.SUI,
//         ChainId.APTOS,
//         ChainId.SCROLL,
//         ChainId.BASE,
//         ChainId.STARKNET_MAINNET,
//     ];

//     constructor(chainId?: number) {
//         this.chainId = chainId;
//     }

//     getService(chainId: number): IChainService | null {
//         if (this.supportedChains.includes(chainId)) {
//             return new NonEvmService();
//         }

//         throw new BadRequestError(`Unsupported chain ID: ${chainId}`);
//     }
//     getAddressByPrivateKey(privateKey: string) {}

//     createWallet(customProvider?: Provider): void {}
//     getBalance(address: string, decimals?: number): Promise<string> {}
//     getTokenBalance(
//         owner: string,
//         token: string,
//         decimals?: number,
//     ): Promise<string> {}
//     getChainName(chainId: number): Promise<string> {}
//     get privateKey(): string {}
//     get address(): string {}
// }

// export default NonEvmService;
