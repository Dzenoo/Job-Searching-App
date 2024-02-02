export class NodeError extends Error {
  constructor(
    public message: string,
    public code: string | any,
    public status: number,
    public data: { [key: string]: any } = {}
  ) {
    super();
  }
}

export class UserInputError extends NodeError {
  constructor(errorData: { [key: string]: any }) {
    super("There is validation errors", "USER_INPUT_ERROR", 400, errorData);
  }
}

export class AuthTokenError extends NodeError {
  constructor(message = "Authentication token is invalid") {
    super(message, "AUTH_TOKEN_ERROR", 401);
  }
}

export class RoutesError extends NodeError {
  constructor(url: string) {
    super(`Current ${url} is not valid`, "ROUTES_ERROR", 404);
  }
}
