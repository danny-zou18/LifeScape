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
    daysOfWeek,
    startTimeOfDayInMinutes,
    endTimeOfDayInMinutes,
    difficultyRank,
  } = req.body;

  const available = await isTimeslotAvailable(
    daysOfWeek,
    startTimeOfDayInMinutes,
    endTimeOfDayInMinutes,
    parseInt(characterId)
  );

  if (!available) {
    return res.status(400).json({ error: "Timeslot is not available" });
  }

  await db.routine
    .create({
      data: {
        title: title,
        description: description,
        daysOfWeek: daysOfWeek,
        startTimeOfDayInMinutes: startTimeOfDayInMinutes,
        endTimeOfDayInMinutes: endTimeOfDayInMinutes,
        difficultyRank: difficultyRank,
        Character: {
          connect: {
            id: parseInt(characterId),
          },
        },
      },
    })
    .then((routine) => {
      return res.status(201).json(routine);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Routine Creation Failed" });
    });
});

async function isTimeslotAvailable(
  daysOfWeek: number[],
  startTime: number,
  endTime: number,
  characterId: number
) {
  const overlappingRoutines = await db.routine.findMany({
    where: {
      CharacterId: characterId,
      AND: {
        daysOfWeek: {
          hasSome: daysOfWeek,
        },
        OR: [
          {
            startTimeOfDayInMinutes: {
              lte: endTime,
            },
            endTimeOfDayInMinutes: {
              gte: startTime,
            },
          },
          {
            startTimeOfDayInMinutes: {
              lte: startTime,
            },
            endTimeOfDayInMinutes: {
              gte: startTime,
            },
          },
          {
            startTimeOfDayInMinutes: {
              lte: endTime,
            },
            endTimeOfDayInMinutes: {
              gte: endTime,
            },
          },
        ],
      },
    },
  });

  return overlappingRoutines.length === 0;
}

export { router as routineRouter };
