import { describe, expect, test, vi } from "vitest";

import { getServer } from "../../functions/get-server.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

describe("GET /healthz", () => {
  test("health is ok", async () => {
    const server = await getServer();

    const response = await server.get("/healthz");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ healthy: true });
  });
});
