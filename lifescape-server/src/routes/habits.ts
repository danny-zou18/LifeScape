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

  const {
    title,
    description,
    repeat,
    completionGoalWeekly,
    completionGoalMonthly,
    quitting,
    difficultyRank,
  } = req.body;

  await db.habit
    .create({
      data: {
        title: title,
        description: description,
        repeat: repeat,
        completionGoalWeekly: completionGoalWeekly
          ? parseInt(completionGoalWeekly)
          : null,
        completionGoalMonthly: completionGoalMonthly
          ? parseInt(completionGoalMonthly)
          : null,
        quitting: quitting,
        difficultyRank: difficultyRank,
        Character: {
          connect: {
            id: parseInt(characterId),
          },
        },
      },
    })
    .then((habit) => {
      return res.status(201).json(habit);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Habit Creation Failed" });
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

  await db.habit
    .findMany({
      where: {
        CharacterId: parseInt(characterId),
      },
    })
    .then((habits) => {
      return res.status(200).json(habits);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Failed to get habits" });
    });
});

router.delete("/delete/:userId/:habitId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, habitId } = req.params;
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  await db.habit
    .delete({
      where: {
        id: parseInt(habitId),
      },
    })
    .then(() => {
      return res.status(200).json({ success: "Habit deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Failed to delete habit" });
    });
});

export { router as habitsRouter };
