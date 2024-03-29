import expressSession from "express-session";

import { createExpressApplication } from "./create-express-application.js";
import { createRouter as createAccountsRouter } from "./modules/accounts/create-router.js";
import { createRouter as createAuthenticationRouter } from "./modules/authentication/create-router.js";
import { isSessionSet } from "./modules/authentication/middleware/is-session-set.js";
import { createRouter as createBalancesRouter } from "./modules/balances/create-router.js";
import { createRouter as createCategoriesRouter } from "./modules/categories/create-router.js";
import { createRouter as createGroupsRouter } from "./modules/groups/create-router.js";
import { createRouter as createOperationsRouter } from "./modules/operations/create-router.js";
import { createRouter as createTagsRouter } from "./modules/tags/create-router.js";
import { createRouter as createTransfersRouter } from "./modules/transfers/create-router.js";
import { createRouter as createUsersRouter } from "./modules/users/create-router.js";
import { sessionStore } from "./session-store.js";

export const expressApplication = await createExpressApplication();

expressApplication.use(
  expressSession({
    cookie: {
      maxAge: Number(process.env.DEFAULT_SESSION_DURATION_IN_SECONDS) * 1000,
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    ttl: process.env.DEFAULT_SESSION_DURATION_IN_SECONDS,
  }),
);

const accountsRouter = createAccountsRouter();
const authenticationRouter = createAuthenticationRouter();
const balancesRouter = createBalancesRouter();
const categoriesRouter = createCategoriesRouter();
const groupsRouter = createGroupsRouter();
const tagsRouter = createTagsRouter();
const transfersRouter = createTransfersRouter();
const operationsRouter = createOperationsRouter();
const usersRouter = createUsersRouter();

expressApplication.use("/accounts", isSessionSet, accountsRouter);
expressApplication.use("/authentication", authenticationRouter);
expressApplication.use("/balances", isSessionSet, balancesRouter);
expressApplication.use("/categories", isSessionSet, categoriesRouter);
expressApplication.use("/groups", isSessionSet, groupsRouter);
expressApplication.use("/operations", isSessionSet, operationsRouter);
expressApplication.use("/tags", isSessionSet, tagsRouter);
expressApplication.use("/transfers", isSessionSet, transfersRouter);
expressApplication.use("/users", usersRouter);
