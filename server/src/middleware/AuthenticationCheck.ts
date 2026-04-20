import express from "express";
import { merge } from "lodash";
import jwt from "jsonwebtoken";
import { UserService } from "../service/user";
import { environmentVariables } from "../../config";

export async function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(403);
    }

    interface DecodedToken {
      userId: string;
      iat: number;
      exp: number;
    }

    const decoded = jwt.verify(
      token,
      environmentVariables.jwt_sectret
    ) as DecodedToken;

    if (!decoded) {
      return res.sendStatus(403);
    }

    const existingUser = await UserService.getUserById(decoded.userId);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
}
