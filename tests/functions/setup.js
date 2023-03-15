import { beforeEach } from "vitest";

import { clearDatabase } from "./clear-database.js";
import { prepareTestDatabase } from "./prepare-test-database.js";

beforeEach(async () => {
  await clearDatabase();
  await prepareTestDatabase();
});
