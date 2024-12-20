import { model, Schema } from "mongoose";

const AccountSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        name: {
            type: Schema.Types.String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "Accounts",
    },
);

const AccountModel = model("Account", AccountSchema);

export default AccountModel;
