import express from "express";

import { login } from "./login/login.js";

export const createRouter = () => {
  const authenticationRouter = express.Router();

  authenticationRouter.post("/login", async (request, response) => {
    const { password, username } = request.body;

    const user = await login({ password, username });

    if (user !== false) {
      request.session.user = user;
    }

    response.json(user);
  });

  authenticationRouter.post("/logout", async (request, response) => {
    request.session.destroy((error) => {
      if (error) {
        request.status(400).end();

        return;
      }

      response.clearCookie("connect.sid").end();
    });
  });

  return authenticationRouter;
};
