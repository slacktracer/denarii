import { describe, expect, test, vi } from "vitest";

import { accounts, transfers, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01, user02 } = users.byBindingName;
const { user01Password, user02Password } = userPasswords.byBindingName;

const { transfer01, transfer02, transfer03, transfer05, transfer06 } =
  transfers.byBindingName;

describe("GET /transfers", () => {
  test("it returns all the given user transfers", async () => {
    // given
    const server = await getServer();

    const expectedTransfers = expect.arrayContaining(
      transfers
        .map((transfer) => Object.assign({}, transfer))
        .filter((transfer) => transfer.userID === user01.userID)
        .map((transfer) => {
          transfer.updatedAt = null;

          transfer.fromAccount = {
            accountID: accounts.byID[transfer.fromAccountID].accountID,
            name: accounts.byID[transfer.fromAccountID].name,
          };

          transfer.toAccount = {
            accountID: accounts.byID[transfer.toAccountID].accountID,
            name: accounts.byID[transfer.toAccountID].name,
          };

          return transfer;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/transfers")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTransfers);
  });

  describe("a datetime range is given", () => {
    test("it returns all the given user transfers for the given datetime range", async () => {
      // given
      const server = await getServer();

      const expectedTransfers = [transfer02, transfer03]
        .map((transfer) => Object.assign({}, transfer))
        .map((transfer) => {
          transfer.updatedAt = null;

          transfer.fromAccount = {
            accountID: accounts.byID[transfer.fromAccountID].accountID,
            name: accounts.byID[transfer.fromAccountID].name,
          };

          transfer.toAccount = {
            accountID: accounts.byID[transfer.toAccountID].accountID,
            name: accounts.byID[transfer.toAccountID].name,
          };

          return transfer;
        })
        .sort(
          (transferA, transferB) =>
            new Date(transferB.at) - new Date(transferA.at),
        );

      const from = "2023-12-10T00:00:00.000Z";
      const to = "2023-12-11T00:00:00.000Z";

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/transfers?from=${from}&to=${to}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTransfers);
    });
  });

  describe("only a starting datetime is given", () => {
    test("it returns all the given user transfers since the given starting datetime", async () => {
      // given
      const server = await getServer();

      const expectedTransfers = [transfer01, transfer02]
        .map((transfer) => Object.assign({}, transfer))
        .map((transfer) => {
          transfer.updatedAt = null;

          transfer.fromAccount = {
            accountID: accounts.byID[transfer.fromAccountID].accountID,
            name: accounts.byID[transfer.fromAccountID].name,
          };

          transfer.toAccount = {
            accountID: accounts.byID[transfer.toAccountID].accountID,
            name: accounts.byID[transfer.toAccountID].name,
          };

          return transfer;
        })
        .sort(
          (transferA, transferB) =>
            new Date(transferB.at) - new Date(transferA.at),
        );

      const from = "2023-12-11T00:00:00.000Z";

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/transfers?from=${from}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTransfers);
    });
  });

  describe("only an ending datetime is given", () => {
    test("it returns all the given user transfers from before the given ending datetime", async () => {
      // given
      const server = await getServer();

      const expectedTransfers = [transfer06]
        .map((transfer) => Object.assign({}, transfer))
        .map((transfer) => {
          transfer.updatedAt = null;

          transfer.fromAccount = {
            accountID: accounts.byID[transfer.fromAccountID].accountID,
            name: accounts.byID[transfer.fromAccountID].name,
          };

          transfer.toAccount = {
            accountID: accounts.byID[transfer.toAccountID].accountID,
            name: accounts.byID[transfer.toAccountID].name,
          };

          return transfer;
        })
        .sort(
          (transferA, transferB) =>
            new Date(transferB.at) - new Date(transferA.at),
        );

      const to = "2012-11-30T00:00:00.000Z";

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user02Password,
        server,
        username: user02.username,
      });

      // when
      const response = await server
        .get(`/transfers?to=${to}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTransfers);
    });
  });

  describe("a transfer ID was given", () => {
    test("it returns just the transfer with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedTransfer = expect.objectContaining({
        ...transfer01,
        fromAccount: {
          accountID: accounts.byID[transfer01.fromAccountID].accountID,
          name: accounts.byID[transfer01.fromAccountID].name,
        },
        toAccount: {
          accountID: accounts.byID[transfer01.toAccountID].accountID,
          name: accounts.byID[transfer01.toAccountID].name,
        },
      });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/transfers/${transfer01.transferID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTransfer);
    });

    describe("the given transfer does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedTransfer = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/transfers/${transfer05.transferID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedTransfer);
      });
    });
  });
});
