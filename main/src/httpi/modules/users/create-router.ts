import express from "express";

import { deleteUserByID } from "./route-handlers/delete-user-by-id.js";
import { getUsers } from "./route-handlers/get-users.js";
import { getUserByID } from "./route-handlers/get-user-by-id.js";
import { postUser } from "./route-handlers/post-user.js";
import { patchUser } from "./route-handlers/patch-user.js";

export const createRouter = () => {
  const usersRouter = express.Router();

  usersRouter.delete("/:userID", deleteUserByID);

  usersRouter.get("/", getUsers);

  usersRouter.get("/:userID", getUserByID);

  usersRouter.post("/", postUser);

  usersRouter.patch("/:userID", patchUser);

  return usersRouter;
};
