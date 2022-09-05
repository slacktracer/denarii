import express from "express";

import { deleteGroupByID } from "./route-handlers/delete-group-by-id.js";
import { getGroups } from "./route-handlers/get-groups.js";
import { getGroupByID } from "./route-handlers/get-group-by-id.js";
import { postGroup } from "./route-handlers/post-group.js";
import { patchGroup } from "./route-handlers/patch-group.js";

export const createRouter = () => {
  const groupsRouter = express.Router();

  groupsRouter.delete("/:groupID", deleteGroupByID);

  groupsRouter.get("/", getGroups);

  groupsRouter.get("/:groupID", getGroupByID);

  groupsRouter.post("/", postGroup);

  groupsRouter.patch("/:groupID", patchGroup);

  return groupsRouter;
};
