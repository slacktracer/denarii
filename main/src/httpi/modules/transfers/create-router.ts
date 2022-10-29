import express from "express";

import { deleteTransferByID } from "./route-handlers/delete-transfer-by-id.js";
import { getTransferByID } from "./route-handlers/get-transfer-by-id.js";
import { getTransfers } from "./route-handlers/get-transfers.js";
import { patchTransfer } from "./route-handlers/patch-transfer.js";
import { postTransfer } from "./route-handlers/post-transfer.js";

export const createRouter = () => {
  const transfersRouter = express.Router();

  transfersRouter.delete("/:transferID", deleteTransferByID);

  transfersRouter.get("/", getTransfers);

  transfersRouter.get("/:transferID", getTransferByID);

  transfersRouter.post("/", postTransfer);

  transfersRouter.patch("/:transferID", patchTransfer);

  return transfersRouter;
};
