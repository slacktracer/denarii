export const getSessionCookies = async ({ password, server, username }) => {
  const response = await server
    .post("/authentication/login")
    .send({ password, username });

  const cookies = response.get("set-cookie");

  console.log(cookies);

  const secretCookie = cookies.find(
    (cookie) =>
      /^(?<secretCookie>secret=.+); Path=\/; Secure; SameSite=None$/.exec(
        cookie,
      )?.groups?.secretCookie,
  );

  const sessionIDCookie = cookies.find(
    (cookie) =>
      /^(?<sessionIDCookie>connect.sid=.+); Path=\/; HttpOnly$/.exec(cookie)
        ?.groups?.sessionIDCookie,
  );

  return { secretCookie, sessionIDCookie };
};
