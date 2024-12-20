import AccountModel from "@domain/models/account.model";

import { CreateAccount } from "./account.type";

class AccountService {
    async createAccount(payload: CreateAccount) {
        const account = await AccountModel.create(payload);
        return account;
    }
}

const accountService = new AccountService();

export default accountService;
