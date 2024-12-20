import { validAddress } from "@shared/utils/validate";
import { model, Schema } from "mongoose";

const WalletSchema = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        chainId: {
            type: Schema.Types.Number,
            required: true,
        },
        address: {
            type: Schema.Types.String,
            validate: {
                validator: validAddress,
            },
        },
        balance: {
            type: Schema.Types.Number,
            default: 0,
            required: true,
        },
        keyA: {
            type: Schema.Types.String,
            required: true,
        },
        type: {
            type: Schema.Types.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "Wallets",
    },
);

const WalletModel = model("Wallet", WalletSchema);

export default WalletModel;
