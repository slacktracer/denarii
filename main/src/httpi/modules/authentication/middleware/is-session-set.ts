import { print } from "../../../objects/print.js";

export const isSessionSet = (request, response, next) => {
  if (request.session.user === undefined) {
    response.clearCookie("secret").clearCookie("connect.sid").status(401).end();

    return;
  }

  if (
    request.cookies.secret === undefined ||
    request.cookies.secret !== request.session.user.secret
  ) {
    request.session.destroy((error) => {
      if (error) {
        print.error(error);
      }

      response
        .clearCookie("secret")
        .clearCookie("connect.sid")
        .status(401)
        .end();
    });

    return;
  }

  next();
};
