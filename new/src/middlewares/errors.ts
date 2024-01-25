import { ErrorRequestHandler } from "express";
import { NodeError } from "../errors";

export const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  const isErrorClient = error instanceof NodeError;

  const clientError = isErrorClient
    ? {
        message: error.message,
        code: error.code,
        status: error.status,
        data: error.data,
      }
    : {
        message: "Something went wrong, please contact our support.",
        code: "INTERNAL_ERROR",
        status: 500,
        data: {},
      };

  res.status(clientError.status).send({ error: clientError });
};
