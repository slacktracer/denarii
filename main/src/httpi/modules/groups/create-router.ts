import express from "express";

import { groups } from "../../../persistence/persistence.js";

export const createRouter = () => {
  const groupsRouter = express.Router();

  groupsRouter.get("/", async (request, response) => {
    const { userID } = request.session.user;

    const groupsRouter = await groups.readGroups({ userID });

    response.json(groupsRouter);
  });

  return groupsRouter;
};
