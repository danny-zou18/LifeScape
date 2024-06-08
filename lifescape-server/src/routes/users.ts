import express from "express";
import { db } from "../utils/db.server";

import { getAuth } from "firebase-admin/auth";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;

  const checkUsername = await db.users.findUnique({
    where: {
      username: username,
    },
  });
  if (checkUsername) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const checkEmail = await db.users.findUnique({
    where: {
      email: email,
    },
  });
  if (checkEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  getAuth()
    .createUser({
      email: email,
      password: password,
    })
    .then(async (userRecord) => {
      await db.users
        .create({
          data: {
            id: userRecord.uid,
            username: username,
            email: email,
            name: name,
          },
        })
        .then((user) => {
          return res.json({
            message: "User Registered Successfully!",
            success: true,
            newUser: user,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ error: "User Creation Failed" });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "User Creation Failed" });
    });
});

export { router as userRouter };
