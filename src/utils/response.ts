import { Response } from "express";

export function responseServerHandler<
  T extends any,
  Q extends number,
  Y extends Response
>(message: T, code: Q, response: Y) {
  response.status(code).send(message);
}
