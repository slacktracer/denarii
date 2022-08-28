import { createAccount } from "../../../persistence/modules/accounts/create-account.js";
import { deleteAccount } from "../../../persistence/modules/accounts/delete-account.js";
import { readAccount } from "../../../persistence/modules/accounts/read-account.js";
import { readAccounts } from "../../../persistence/modules/accounts/read-accounts.js";
import { updateAccount } from "../../../persistence/modules/accounts/update-account.js";

export const createCommands = ({ program }) => {
  const accountsCommand = program.command("accounts");

  accountsCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const data = JSON.parse(options.data);

      const account = JSON.stringify(
        await createAccount({ data, userID }),
        null,
        2,
      );

      console.log(account);
    });

  accountsCommand
    .command("delete")
    .requiredOption("--accountID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { accountID, userID } = options;

      await deleteAccount({ accountID, userID });

      console.log(`Account ${accountID} deleted.`);
    });

  accountsCommand
    .command("read")
    .option("--accountID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { accountID, userID } = options;

      if (accountID) {
        const account = await readAccount({ accountID, userID });

        console.log(account);

        return;
      }

      const accounts = await readAccounts({ userID });

      console.table(accounts);
    });

  accountsCommand
    .command("update")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { accountID, userID } = options;

      const data = JSON.parse(options.data);

      const account = JSON.stringify(
        await updateAccount({ accountID, data, userID }),
        null,
        2,
      );

      console.log(account);
    });

  return accountsCommand;
};
