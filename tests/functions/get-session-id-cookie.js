export const getSessionIDCookie = async ({ password, server, username }) => {
  const response = await server
    .post("/authentication/login")
    .send({ password, username });

  const cookies = response.get("set-cookie");

  const sessionIDCookie = cookies.find(
    (cookie) =>
      /^(?<sessionIDCookie>connect.sid=.+); Path=\/; HttpOnly$/.exec(cookie)
        ?.groups?.sessionIDCookie,
  );

  return sessionIDCookie;
};
