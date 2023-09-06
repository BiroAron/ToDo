import express from "express";
import jwt from "jsonwebtoken";
import { authentication, random } from "../helpers/index";
import { UserService } from "../service/user";
import { User } from "models/user";

export class AuthController {
  static async register(req: express.Request, res: express.Response) {
    try {
      const { email, password, firstname, lastname } = req.body;

      if (!email || !password || !firstname || !lastname) {
        return res.sendStatus(400);
      }

      const existingUser = await UserService.getUserByEmail(email);

      if (existingUser) {
        return res.sendStatus(409);
      }

      const salt = random();
      const hashedPassword = authentication(salt, password);
      const saltAndPassword = salt + hashedPassword;

      const user: User = await UserService.createUser({
        email,
        firstname,
        lastname,
        password: saltAndPassword,
      } as User);

      return res.status(201).json(user);
    } catch (error) {
      console.error("Error during registration:", error);
      return res.sendStatus(500);
    }
  }

  static async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.sendStatus(400);
      }

      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.sendStatus(409);
      }

      const storedSalt = user.password.substring(0, 50);
      const storedHash = user.password.substring(50);
      const expectedHash = authentication(storedSalt, password);

      if (storedHash !== expectedHash) {
        return res.sendStatus(403);
      }

      const token = jwt.sign(
        { userId: user._id.toString() },
        process.env.JWT_SECRET
      );

      return res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  }
}
