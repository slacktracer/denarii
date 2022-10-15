#!/usr/bin/env node
import "dotenv/config";

import commander from "commander";

import { createCommands as createAccountsCommands } from "./modules/accounts/create-commands.js";
import { createCommands as createBalancesCommands } from "./modules/balances/create-commands.js";
import { createCommands as createOperationsCommands } from "./modules/operations/create-commands.js";
import { createCommands as createTransfersCommands } from "./modules/transfers/create-commands.js";
import { createCommands as createUsersCommands } from "./modules/users/create-commands.js";

const program = new commander.Command();

createAccountsCommands({ program });
createBalancesCommands({ program });
createOperationsCommands({ program });
createTransfersCommands({ program });
createUsersCommands({ program });

program.version("1.0.0");
program.parse(process.argv);
