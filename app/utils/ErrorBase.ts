export class ErrorBase<T extends string> extends Error {
  override name: T;
  override message: string;
  override cause: unknown;
  constructor(name: T, message: string, cause?: unknown) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
