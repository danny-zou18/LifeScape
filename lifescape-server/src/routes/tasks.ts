import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

router.post("/create/:userId/:characterId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, characterId } = req.params;
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { title, description, dueDate } = req.body;

  await db.task
    .create({
      data: {
        title: title,
        description: description,
        dueDate: dueDate,
        Character: {
          connect: {
            id: parseInt(characterId),
          },
        },
      },
    })
    .then((task) => {
      return res.json({ success: true, task: task });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Task Creation Failed" });
    });
});

export { router as tasksRouter };
