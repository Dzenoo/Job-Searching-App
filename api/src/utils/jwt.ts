import jwt, { SignOptions } from "jsonwebtoken";
import { AuthTokenError } from "../errors/errors";

const signToken = <T extends object, Q extends SignOptions>(
  payload: T,
  options?: Q
): string =>
  jwt.sign(payload, process.env.JWT_SECRET! as string, {
    expiresIn: "7 days",
    ...options,
  });

const verifyToken = <T extends string>(token: T): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET! as string);

    if (payload) {
      return payload as { [key: string]: any };
    }

    throw new Error();
  } catch (error) {
    throw new AuthTokenError();
  }
};

export { signToken, verifyToken };
