export const getSessionCookies = async ({ password, server, username }) => {
  const response = await server
    .post("/authentication/login")
    .send({ password, username });

  const cookies = response.get("set-cookie");

  const secretCookie = cookies.find((cookie) => cookie.startsWith("secret="));

  const sessionIDCookie = cookies.find((cookie) =>
    cookie.startsWith("connect.sid="),
  );

  return { secretCookie, sessionIDCookie };
};
