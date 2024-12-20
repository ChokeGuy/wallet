import { HDNodeWallet, Provider } from "ethers";

interface IChainService {
    readonly wallet: HDNodeWallet;
    readonly chainId: number | undefined;
    readonly provider: Provider | undefined;

    createWallet(customProvider?: Provider): void;

    getBalance(address: string, decimals?: number): Promise<string>;

    getTokenBalance(
        owner: string,
        token: string,
        decimals?: number,
    ): Promise<string>;

    getChainName(chainId: number): Promise<string>;

    getAddressByPrivateKey(privateKey: string): unknown;

    get privateKey(): string;
    get address(): string;
}

export default IChainService;
