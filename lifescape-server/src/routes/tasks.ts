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
      return res.status(201).json(task);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Task Creation Failed" });
    });
});

router.get("/get/:userId/:characterId", async (req, res) => {
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

  await db.task
    .findMany({
      where: {
        CharacterId: parseInt(characterId),
      },
    })
    .then((tasks) => {
      return res.status(200).json(tasks);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
});

export { router as tasksRouter };

router.delete("/delete/:userId/:taskId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, taskId } = req.params;
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await db.task
    .delete({
      where: {
        id: parseInt(taskId),
      },
    })
    .then(() => {
      return res.status(200).json({ message: "Task deleted successfully" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
});
