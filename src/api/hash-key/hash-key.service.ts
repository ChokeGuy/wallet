import { decode, encode } from "@shared/utils/format";
import { combine, split } from "shamir-secret-sharing";

import { Share } from "./hash-key.type";

class HashKeyService {
    devidePrivateKey = async (
        privateKey: string,
        threshold: number = 2,
        totalShares: number = 3,
    ) => {
        const secret = encode(privateKey);

        const shares = await split(secret, totalShares, threshold);

        return {
            shareA: { key: shares[0] },
            shareB: { key: shares[1] },
            shareC: { key: shares[2] },
        };
    };

    mergePrivateKey = async (shares: Share[]) => {
        const _shares = shares.map(
            (share) => new Uint8Array(Object.values(share.key)),
        );

        const privateKey = await combine(_shares);

        return decode(privateKey);
    };

    renewPrivateKey = async (
        oldShares: Share[],
        threshold: number = 2,
        totalShares: number = 3,
    ) => {
        const privateKey = await this.mergePrivateKey(oldShares);

        return this.devidePrivateKey(privateKey, threshold, totalShares);
    };
}

const hashKeyService = new HashKeyService();

export default hashKeyService;
