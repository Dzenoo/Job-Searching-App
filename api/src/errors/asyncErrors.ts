import { RequestHandler } from "express";

export const asyncErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (request, response, next): Promise<any> => {
    try {
      return await requestHandler(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};
