import express from "express";

import { users } from "../../../persistence/persistence.js";

const { createUser } = users;

export const createRouter = () => {
  const usersRouter = express.Router();

  usersRouter.post("/", async (request, response) => {
    const { email, password, username } = request.body;

    const data = { email, password, username };

    const createdUser = await createUser({ data });

    response.json(createdUser);
  });

  return usersRouter;
};
