type CreateWallet = {
    userId: string;
    accountId: string;
    chainId: number;
    aa: boolean;
};

type ImportWallet = {
    name: string;
    chainId: number;
    privateKey: string;
};

export type { CreateWallet, ImportWallet };
