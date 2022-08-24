import request from "supertest";

export const getServer = async () => {
  const { expressApplication } = await import("denarii/src/httpi/httpi.js");

  const server = request(expressApplication);

  return server;
};
