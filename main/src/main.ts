import "./httpi/httpi.js";

process.on("uncaughtException", (...params) => {
  console.error(params);
});

process.on("unhandledRejection", (...params) => {
  console.error(params);
});
