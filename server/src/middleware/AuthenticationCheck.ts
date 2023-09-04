import express from "express";
import { get, merge } from "lodash";
import jwt from "jsonwebtoken";
import { getUserById } from "../service/user";
import "dotenv/config";

export async function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("isAuthenticated");
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    if (!decoded) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserById(decoded.userId);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
