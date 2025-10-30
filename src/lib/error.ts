export class ErrorBase<T extends string> extends Error {
   name: T;
   message: string;
   status?: number;
   cause: unknown;

   constructor({
      name,
      message,
      status,
      cause,
   }: {
      name: T;
      message: string;
      status?: number;
      cause?: unknown;
   }) {
      super();
      this.name = name;
      this.message = message;
      this.status = status;
      this.cause = cause;
   }
}

type ApiErrorName = "INVALID_API_KEY" | "BAD_REQUEST" | "INTERNAL_SERVER_ERROR";
export class ApiError extends ErrorBase<ApiErrorName> {}
