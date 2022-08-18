import express from "express";

import { createUser } from "../../../core/modules/users/core/create-user.js";

export const createRouter = () => {
  const usersRouter = express.Router();

  usersRouter.post("/", async (request, response) => {
    const { email, password, username } = request.body;

    const data = { email, password, username };

    const usersRouter = await createUser({ data });

    response.json(usersRouter);
  });

  return usersRouter;
};
