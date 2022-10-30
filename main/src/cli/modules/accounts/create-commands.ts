import { accounts } from "../../../persistence/persistence.js";
import { print } from "../../objects/print.js";

const {
  createAccount,
  deleteAccount,
  readAccounts,
  readAccount,
  updateAccount,
} = accounts;

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

      print.info(account);
    });

  accountsCommand
    .command("delete")
    .requiredOption("--accountID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { accountID, userID } = options;

      await deleteAccount({ accountID, userID });

      print.info(`Account ${accountID} deleted.`);
    });

  accountsCommand
    .command("read")
    .option("--accountID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { accountID, userID } = options;

      if (accountID) {
        const account = await readAccount({ accountID, userID });

        print.info(account);

        return;
      }

      const accounts = await readAccounts({ userID });

      print.table(accounts);
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

      print.info(account);
    });

  return accountsCommand;
};
