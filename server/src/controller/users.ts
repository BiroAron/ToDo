import express from "express";

import { deleteUserById, getUsers, getUserById } from "../service/user";
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

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const id = get(req, "identity._id");

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const id = get(req, "identity._id");
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.lastname = lastname;
    user.firstname = firstname;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.sendStatus(400);
  }
}
