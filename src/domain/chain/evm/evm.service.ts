import ERC20_ABI from "@shared/abis/ERC20_ABI.json";
import { ChainId } from "@shared/constant/chain-id";
import { BadRequestError } from "@shared/lib/http/httpError";
import { Contract, formatUnits, HDNodeWallet, Provider, Wallet } from "ethers";

import IChainService from "../interface";
import { getEvmByChain } from "../utils";

class EvmService implements IChainService {
    chainId: number;
    provider: Provider;
    wallet!: HDNodeWallet;
    supportedChains: number[] = [
        ChainId.ETHEREUM,
        ChainId.POLYGON,
        ChainId.AVAX_MAINNET,
        ChainId.POLYGON_MAINNET,
        ChainId.BNB_MAINNET,
    ];

    constructor(chainId: number = ChainId.ETHEREUM) {
        this.chainId = chainId;

        this.provider = getEvmByChain(chainId);
    }

    getAddressByPrivateKey(privateKey: string) {
        const wallet = new Wallet(privateKey, this.provider);

        return wallet;
    }

    getService(chainId: number): IChainService | null {
        if (this.supportedChains.includes(chainId)) {
            return new EvmService();
        }

        throw new BadRequestError(`Unsupported chain ID: ${chainId}`);
    }

    async getChainName(chainId: number) {
        const network = await this.provider.getNetwork();

        if (!network) {
            throw new BadRequestError(`Unsupported chain ID: ${chainId}`);
        }
        return network.name;
    }

    createWallet(customProvider: Provider) {
        this.wallet = Wallet.createRandom();

        this.wallet.connect(customProvider || this.provider);
    }

    async getBalance(address: string, decimals: number = 18) {
        const balance = await this.provider.getBalance(address);

        const formatBalance = formatUnits(balance, decimals);

        return formatBalance;
    }

    async getTokenBalance(owner: string, token: string, decimals: number = 18) {
        const contract = new Contract(token, ERC20_ABI, this.wallet);

        const balance = await contract.balanceOf(owner);

        const formatBalance = formatUnits(balance, decimals);

        return formatBalance;
    }

    async getAddressFromPrivateKey(privateKey: string) {
        const wallet = new Wallet(privateKey);

        const address = await wallet.getAddress();

        if (!address) throw new BadRequestError("Invalid private key");

        return address;
    }

    get address() {
        return this.wallet.address;
    }

    get privateKey() {
        return this.wallet.privateKey;
    }
}

export default EvmService;
