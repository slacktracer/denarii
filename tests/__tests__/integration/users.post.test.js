import { describe, expect, test, vi } from "vitest";

import { getServer } from "../../functions/get-server.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

describe("POST /users", () => {
  test("it returns new user", async () => {
    const server = await getServer();

    const email = "jack@example.com";
    const password = "1234";
    const username = "jack";

    const expectedCreateUser = expect.objectContaining({
      email,
      username,
    });

    const response = await server
      .post("/users")
      .send({ email, password, username });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedCreateUser);
  });
});
