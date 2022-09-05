import { groups } from "../../../persistence/persistence.js";

const { createGroup, deleteGroup, readGroup, readGroups, updateGroup } = groups;

export const createCommands = ({ program }) => {
  const groupsCommand = program.command("groups");

  groupsCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const data = JSON.parse(options.data);

      const group = JSON.stringify(
        await createGroup({ data, userID }),
        null,
        2,
      );

      console.log(group);
    });

  groupsCommand
    .command("delete")
    .requiredOption("--groupID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { groupID, userID } = options;

      await deleteGroup({ groupID, userID });

      console.log(`Group ${groupID} deleted.`);
    });

  groupsCommand
    .command("read")
    .option("--groupID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { groupID, userID } = options;

      if (groupID) {
        const group = await readGroup({ groupID, userID });

        console.log(group);

        return;
      }

      const groups = await readGroups({ userID });

      console.table(groups);
    });

  groupsCommand
    .command("update")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { groupID, userID } = options;

      const data = JSON.parse(options.data);

      const group = JSON.stringify(
        await updateGroup({ groupID, data, userID }),
        null,
        2,
      );

      console.log(group);
    });

  return groupsCommand;
};
