import express from "express";

import { UserService } from "../service/user";
import { get } from "lodash";

export class UserController {
  static async getUser(req: express.Request, res: express.Response) {
    try {
      const id = get(req, "identity._id");

      const user = await UserService.getUserById(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}
