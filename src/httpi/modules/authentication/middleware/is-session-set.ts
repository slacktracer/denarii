export const isSessionSet = (request, response, next) => {
  if (request.session.user === undefined) {
    response.status(401).end();

    return;
  }

  next();
};
