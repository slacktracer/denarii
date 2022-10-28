import express from "express";

import { deleteOperationByID } from "./route-handlers/delete-operation-by-id.js";
import { getOperationByID } from "./route-handlers/get-operation-by-id.js";
import { getOperations } from "./route-handlers/get-operations.js";
import { patchOperation } from "./route-handlers/patch-operation.js";
import { postOperation } from "./route-handlers/post-operation.js";

export const createRouter = () => {
  const operationsRouter = express.Router();

  operationsRouter.delete("/:operationID", deleteOperationByID);

  operationsRouter.get("/", getOperations);

  operationsRouter.get("/:operationID", getOperationByID);

  operationsRouter.post("/", postOperation);

  operationsRouter.patch("/:operationID", patchOperation);

  return operationsRouter;
};
