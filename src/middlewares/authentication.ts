import { responseServerHandler } from "../utils/response";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return responseServerHandler("Unauthorized - Missing token", 401, response);
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return responseServerHandler(
        "Unauthorized - Invalid token",
        401,
        response
      );
    }

    const userType: string = decoded.userType;

    if (userType === "seeker") {
      // @ts-ignore
      request.user = decoded;
      if (request.path.startsWith("/seeker")) {
        next();
      } else {
        return responseServerHandler(
          "Unauthorized - Seekers cannot access employer routes",
          403,
          response
        );
      }
    } else if (userType === "employer") {
      // @ts-ignore
      request.user = decoded;
      if (request.path.includes("/employer")) {
        next();
      } else {
        return responseServerHandler(
          "Unauthorized - Employers cannot access seeker routes",
          403,
          response
        );
      }
    } else {
      return responseServerHandler(
        "Unauthorized - Invalid user type",
        403,
        response
      );
    }
  });
};
