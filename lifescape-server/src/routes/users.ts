import express from "express";
import { db } from "../utils/db.server";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, username, firebaseUID, email} = req.body;
  
  const checkUsername = await db.users.findUnique({
    where: {
      username: username,
    },
  });
  
  if (checkUsername) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const newUser = await db.users.create({
    data: {
      id: firebaseUID,
      username: username,
      email: email,
      name: name,
    }
  })
  res.json({ message: "User Registered Successfully!", success: true, newUser: newUser });
}); 

export { router as userRouter };
