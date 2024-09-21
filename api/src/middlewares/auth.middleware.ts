import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/validation";

export const authenticateUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendResponse("Unauthorized - Missing token", 401, response);
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      let errorMessage = "Unauthorized - Invalid token";
      if (err.name === "TokenExpiredError") {
        errorMessage = "Unauthorized - Token expired";
      } else if (err.name === "JsonWebTokenError") {
        errorMessage = "Unauthorized - Invalid token";
      }

      return sendResponse(errorMessage, 401, response);
    }

    // @ts-ignore
    request.user = decoded;

    // @ts-ignore
    if (!request.user) {
      return sendResponse(
        "Unauthorized - User not authenticated",
        401,
        response
      );
    }

    const userType = decoded.userType;
    if (userType === "seeker" && request.path.startsWith("/employer")) {
      return sendResponse(
        "Unauthorized - Seekers cannot access employer routes",
        403,
        response
      );
    } else if (userType === "employer" && request.path.startsWith("/seeker")) {
      return sendResponse(
        "Unauthorized - Employers cannot access seeker routes",
        403,
        response
      );
    }

    next();
  });
};
