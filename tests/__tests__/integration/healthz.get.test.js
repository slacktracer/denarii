import { describe, expect, test, vi } from "vitest";

import { getServer } from "../../functions/get-server.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);
vi.mock(`../../../main/package.json`, () => ({
  default: { version: "1.0.0-build.0" },
}));

describe("GET /healthz", () => {
  test("health is ok", async () => {
    const server = await getServer();

    const response = await server.get("/healthz");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ build: "0", database: true, redis: true });
  });
});
