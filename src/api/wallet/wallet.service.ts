import hashKeyService from "@api/hash-key/hash-key.service";
import IChainService from "@domain/chain/interface";
import ChainServiceManager from "@domain/chain/mapping";
import AccountModel from "@domain/models/account.model";
import WalletModel from "@domain/models/wallet.model";
import { ChainId } from "@shared/constant/chain-id";
import { BadRequestError } from "@shared/lib/http/httpError";

import { CreateWallet, ImportWallet } from "./wallet.type";

class WalletService {
    private chainServiceManager: ChainServiceManager;
    private chainService!: IChainService;

    constructor() {
        this.chainServiceManager = new ChainServiceManager();
    }

    async createWallet(payload: CreateWallet) {
        const { accountId, chainId, userId } = payload;

        const account = await AccountModel.findOne({
            userId,
            _id: accountId,
        });

        if (!account) throw new BadRequestError("Account not found");

        const wallet = await WalletModel.findOne({
            accountId,
            chainId,
        });

        this.chainService = this.chainServiceManager.getChainService(chainId);

        const chainName = this.chainService.getChainName(chainId);

        if (wallet)
            throw new BadRequestError(
                `Wallet on chain ${chainName} already exists`,
            );

        this.chainService.createWallet();

        const { address, privateKey } = this.chainService;

        const { shareA, shareB, shareC } =
            await hashKeyService.devidePrivateKey(privateKey);

        await WalletModel.create({
            accountId,
            chainId,
            address,
            keyA: shareA,
            type: true,
        });

        return {
            address,
            keyB: shareB,
            keyC: shareC,
        };
    }

    private async createAndSaveWallet(
        accountId: string,
        chainId: number,
        address: string,
        privateKey: string,
    ) {
        const { shareA, shareB, shareC } =
            await hashKeyService.devidePrivateKey(privateKey);

        await WalletModel.create({
            accountId,
            chainId,
            address,
            keyA: shareA,
            type: true,
        });

        return {
            chainId,
            address,
            balance: 0,
            shareB: {
                key: shareB.key,
                type: "b",
            },
            shareC: {
                key: shareC.key,
                type: "c",
            },
        };
    }

    async importWallet(_payload: ImportWallet) {
        const { name, chainId, privateKey } = _payload;

        if (!name) throw new BadRequestError("Invalid account name");

        this.chainService = this.chainServiceManager.getChainService(chainId);

        const account = await AccountModel.findOne({
            name,
        });

        if (account) throw new BadRequestError("This name is already in use");

        const address = this.chainService.getAddressByPrivateKey(privateKey);

        const wallet = await WalletModel.findOne({
            address,
            chainId,
        });

        if (wallet) throw new BadRequestError("This wallet is already in use");

        const newAccount = await AccountModel.create({
            name,
        });

        const wallets = [];

        if (chainId !== ChainId.ETHEREUM) {
            this.chainService.createWallet();
            wallets.push(
                await this.createAndSaveWallet(
                    newAccount._id.toString(),
                    ChainId.ETHEREUM,
                    this.chainService.address,
                    this.chainService.privateKey,
                ),
            );
        }
        wallets.push(
            await this.createAndSaveWallet(
                newAccount._id.toString(),
                chainId,
                this.chainService.address,
                this.chainService.privateKey,
            ),
        );

        return {
            accountId: newAccount._id.toString(),
            name,
            wallets,
        };
    }
}

const walletService = new WalletService();

export default walletService;
