import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getUserByEmail, createUser } from "../service/user";
import { authentication, random } from "../helpers/index";
import { User } from "models/user";

export async function register(req: express.Request, res: express.Response) {
  console.log("register");

  try {
    const { email, password, firstname, lastname } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log("User already exists.");
      return res.sendStatus(400);
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);
    const saltAndPassword = salt + hashedPassword;

    const user: User = await createUser({
      email,
      firstname,
      lastname,
      password: saltAndPassword,
    } as User);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.sendStatus(500);
  }
}

export async function login(req: express.Request, res: express.Response) {
  console.log("login");
  try {
    const { email, password } = req.body;

    const user = (await getUserByEmail(email)) as User;

    if (!user) {
      return res.sendStatus(400);
    }

    const storedSalt = user.password.substring(0, 50);
    const storedHash = user.password.substring(50);
    const expectedHash = authentication(storedSalt, password);

    if (storedHash !== expectedHash) {
      return res.sendStatus(403);
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, firstName: user.firstname });
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}
