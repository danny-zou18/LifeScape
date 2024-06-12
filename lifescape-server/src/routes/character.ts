import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

router.get("/get/:userId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId } = req.params;
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userWithCharacter = await db.users.findUnique({
      where: { id: userId },
      include: { character: true },
    });
    if (!userWithCharacter) {
      return res.status(404).json({ error: "User not found" });
    }
    const character = userWithCharacter.character;
    if (!character) {
      return res.json(null);
    }
    res.json(character);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create/:userId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId } = req.params;
  
  //Authorize
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  //Check if user already has a character
  try {
    const userWithCharacter = await db.users.findUnique({
      where: { id: userId },
      include: { character: true },
    });
    if (!userWithCharacter) {
      return res.status(404).json({ error: "User not found" });
    }
    const character = userWithCharacter.character;
    if (character) {
      return res.status(404).json({ error: "User already has a character" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const { name } = req.body;

  //Create the character
  await db.character
    .create({
      data: {
        name: name,
        OwnerId: userId,
      },
    })
    .then((character) => {
      return res.json({ success: true, character: character });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
});

export { router as CharacterRouter };
