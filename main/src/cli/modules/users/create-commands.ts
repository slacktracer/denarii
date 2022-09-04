import { users } from "../../../persistence/modules/users/users.js";

const { createUser, deleteUser, readUser, readUsers, updateUser } = users;

export const createCommands = ({ program }) => {
  const usersCommand = program.command("users");

  usersCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .action(async (options) => {
      const data = JSON.parse(options.data);

      const user = JSON.stringify(await createUser({ data }), null, 2);

      console.log(user);
    });

  usersCommand
    .command("delete")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      await deleteUser({ userID });

      console.log(`User ${userID} deleted.`);
    });

  usersCommand
    .command("read")
    .option("--id <id>")
    .action(async (options) => {
      const { userID } = options;

      if (userID) {
        const user = await readUser({ userID });

        console.log(user);

        return;
      }

      const users = await readUsers();

      console.table(users);
    });

  usersCommand
    .command("update")
    .requiredOption("-d, --data <data>")
    .action(async (options) => {
      const data = JSON.parse(options.data);

      const user = JSON.stringify(await updateUser({ data }), null, 2);

      console.log(user);
    });

  return usersCommand;
};
