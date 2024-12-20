import { Share } from "@api/hash-key/hash-key.type";
import { BadRequestError } from "@shared/lib/http/httpError";

const isValidPrivateKey = (key: string): boolean =>
    /^0x[a-fA-F0-9]{64}$/.test(key);

const validatePrivateKey = (value: string) => {
    if (!isValidPrivateKey(value)) {
        throw new BadRequestError();
    }

    return value;
};

function validAddress(address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function validateShare(share: Share) {
    if (typeof share !== "object" || share === null) {
        return false;
    }

    if (
        !Object.prototype.hasOwnProperty.call(share, "key") ||
        !Object.prototype.hasOwnProperty.call(share, "type")
    ) {
        return false;
    }

    if (typeof share.key !== "object" || share === null) {
        return false;
    }

    for (const key in share.key) {
        if (
            typeof share.key[key] !== "number" ||
            share.key[key] < 0 ||
            share.key[key] > 255
        ) {
            return false;
        }
    }

    if (!["a", "b", "c"].includes(share.type)) {
        return false;
    }

    return true;
}

export { validAddress, validatePrivateKey, validateShare };
