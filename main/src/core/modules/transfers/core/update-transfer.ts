import { db, loadQuery } from "../../../../persistence/persistence.js";

const updateTransferQuery = loadQuery({
  base: import.meta.url,
  url: "./update-transfer.sql",
});

export const updateTransfer = async ({ data, transferID, userID }) => {
  const { ...update } = data;

  const sets = db.$config.pgp.helpers.sets(update);

  const updatedTransfer = await db.one(updateTransferQuery, {
    transferID,
    sets,
    userID,
  });

  return updatedTransfer;
};
