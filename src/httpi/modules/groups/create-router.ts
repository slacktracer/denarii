import express from "express";

import { readGroups } from "../../../core/modules/groups/groups.js";

export const createRouter = () => {
  const groupsRouter = express.Router();

  groupsRouter.get("/", async (request, response) => {
    const { userID } = request.session.user;

    const groupsRouter = await readGroups({ userID });

    response.json(groupsRouter);
  });

  return groupsRouter;
};
