export class CustomError extends Error {
  public data;

  constructor(data, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.data = data ?? {};
    this.name = "CustomError";
  }
}
