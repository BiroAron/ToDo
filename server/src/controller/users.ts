import express from "express";

import { getUserById } from "../service/user";
import { get } from "lodash";

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const id = get(req, "identity._id");

    const user = await getUserById(id);

    if (id) return res.status(200).json(user);

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
