import expressSession from "express-session";

import { createExpressApplication } from "./create-express-application.js";
import { createRouter as createAccountsRouter } from "./modules/accounts/create-router.js";
import { createRouter as createAuthenticationRouter } from "./modules/authentication/create-router.js";
import { isSessionSet } from "./modules/authentication/middleware/is-session-set.js";
import { createRouter as createOperationsRouter } from "./modules/operations/create-router.js";
import { createRouter as createTagsRouter } from "./modules/tags/create-router.js";
import { createRouter as createTransfersRouter } from "./modules/transfers/create-router.js";
import { createRouter as createUsersRouter } from "./modules/users/create-router.js";
import { sessionStore } from "./session-store.js";

export const expressApplication = await createExpressApplication();

expressApplication.use(
  expressSession({
    cookie: { secure: process.env.LOCAL === "true" },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
  }),
);

const accountsRouter = createAccountsRouter();
const authenticationRouter = createAuthenticationRouter();
const tagsRouter = createTagsRouter();
const transfersRouter = createTransfersRouter();
const operationsRouter = createOperationsRouter();
const usersRouter = createUsersRouter();

expressApplication.use("/accounts", isSessionSet, accountsRouter);
expressApplication.use("/authentication", authenticationRouter);
expressApplication.use("/operations", operationsRouter);
expressApplication.use("/tags", tagsRouter);
expressApplication.use("/transfers", transfersRouter);
expressApplication.use("/users", usersRouter);
