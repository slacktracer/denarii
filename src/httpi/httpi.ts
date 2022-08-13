import expressSession from "express-session";

import { createRouter as createAccountsRouter } from "./modules/accounts/create-router.js";
import { createRouter as createAuthenticationRouter } from "./modules/authentication/create-router.js";
import { isSessionSet } from "./modules/authentication/middleware/is-session-set.js";
import { createExpressApplication } from "./create-express-application.js";
import { sessionStore } from "./session-store.js";
import { createRouter as createGroupsRouter } from "./modules/groups/create-router.js";

const expressApplication = await createExpressApplication();

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
const groupsRouter = createGroupsRouter();

expressApplication.use("/accounts", isSessionSet, accountsRouter);
expressApplication.use("/authentication", authenticationRouter);
expressApplication.use("/groups", isSessionSet, groupsRouter);
