import express from "express";
import { v4 as uuid } from "uuid";

import { print } from "../../objects/print.js";
import { login } from "./login/login.js";

export const createRouter = () => {
  const authenticationRouter = express.Router();

  authenticationRouter.post("/login", async (request, response) => {
    const { password, username } = request.body;

    const user = await login({ password, username });

    if (user !== false) {
      const secret = uuid();

      request.session.user = { ...user, secret };

      const domains = process.env.BASE_URL;

      domains?.split(",").forEach((domain) =>
        response.cookie("secret", secret, {
          domain,
          maxAge:
            Number(process.env.DEFAULT_SESSION_DURATION_IN_SECONDS) * 1000,
          sameSite: "None",
          secure: true,
        }),
      );
    }

    response.json(user);
  });

  authenticationRouter.post("/logout", async (request, response) => {
    request.session.destroy((error) => {
      if (error) {
        response.status(500);

        print.error(error);
      } else {
        response.status(205);
      }

      response.clearCookie("secret").clearCookie("connect.sid").end();
    });
  });

  return authenticationRouter;
};
