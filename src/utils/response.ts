import { Response } from "express";

export function responseServerHandler<Q extends number, Y extends Response>(
  message: any,
  code: Q,
  response: Y
) {
  response.status(code).send(message);
}
