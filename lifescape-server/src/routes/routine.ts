import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

/** @api {post} /routine/create/:userId/:characterId Create Routine
 *  @apiName CreateRoutine
 *  @apiGroup Routine
 *
 * @apiDescription Create a routine for a character
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} title Title of the routine
 * @apiBody {String} description Description of the routine
 * @apiBody {Number[]} daysOfWeek Days of the week the routine is scheduled
 * @apiBody {Number} startTimeOfDayInMinutes Start time of the routine in minutes
 * @apiBody {Number} endTimeOfDayInMinutes End time of the routine in minutes
 * @apiBody {Number} difficultyRank Difficulty rank of the routine
 *
 * @apiSuccess {Object} routine Routine object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 *      {
 *        ROUTINE OBJECT
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 401 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError RoutineCreationFailed Time slot is not available
 * @apiErrorExample {json} RoutineCreationFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Timeslot is not available"
 *      }
 *
 * @apiError RoutineCreationFailed Routine creation failed
 * @apiErrorExample {json} RoutineCreationFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Creation Failed"
 *      }
 */
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
        experienceReward: 10,
        goldReward: 10,
        StrengthReward: 3,
        DefenseReward: 3,
        AgilityReward: 3,
        VitalityReward: 3,
        EnduranceReward: 3,
        WillReward: 3,
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

/** @api {get} /routine/getDay/:userId/:characterId Get Routines for current Day
 *  @apiName GetRoutinesForDay
 *  @apiGroup Routine
 *
 * @apiDescription Get routines for a character on a particular weekday
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} routines Array of routine objects
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *        ROUTINE OBJECTS
 *      ]
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 401 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError RoutineFetchFailed Routine fetch failed
 * @apiErrorExample {json} RoutineFetchFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Fetch Failed"
 *      }
 */
router.get("/getDay/:userId/:characterId", async (req, res) => {
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

  const currentDay = new Date().getDay() + 1;

  await db.routine
    .findMany({
      where: {
        CharacterId: parseInt(characterId),
        daysOfWeek: {
          has: currentDay,
        },
      },
      orderBy: {
        startTimeOfDayInMinutes: "asc", // Sort by startTimeOfDayInMinutes in ascending order
      },
    })
    .then((routines) => {
      return res.status(200).json(routines);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Routine Fetch Failed" });
    });
});
/** @api {get} /routine/getAll:userId/:characterId Get All Routines
 *  @apiName GetRoutines
 *  @apiGroup Routine
 *
 * @apiDescription Get routines for a character
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} routines Array of routine objects
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *        ROUTINE OBJECTS
 *      ]
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 401 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError RoutineFetchFailed Routine fetch failed
 * @apiErrorExample {json} RoutineFetchFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Fetch Failed"
 *      }
 */
router.get("/getAll/:userId/:characterId", async (req, res) => {
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

  await db.routine
    .findMany({
      where: {
        CharacterId: parseInt(characterId),
      },
      orderBy: {
        startTimeOfDayInMinutes: "asc", // Sort by startTimeOfDayInMinutes in ascending order
      },
    })
    .then((routines) => {
      return res.status(200).json(routines);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Routine Fetch Failed" });
    });
});
/** @api {delete} /routine/delete/:userId/:routineId Delete Task
 *  @apiName DeleteRoutine
 *  @apiGroup Routine
 *
 * @apiDescription Delete a Routine
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} routineId Routine ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object} message Success message
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "message": "Routine deleted successfully"
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 401 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
router.delete("/delete/:userId/:routineId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, routineId } = req.params;

  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await db.routine
    .delete({
      where: {
        id: parseInt(routineId),
      },
    })
    .then(() => {
      return res.status(200).json({ message: "Routine deleted successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

/** @api {put} /routine/update/:userId/:routineId Update Routine
 *  @apiName UpdateRoutine
 *  @apiGroup Routine
 *
 * @apiDescription Update a routine
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} routineId Routine ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} title Title of the routine
 * @apiBody {String} description Description of the routine
 * @apiBody {Number[]} daysOfWeek Days of the week the routine is scheduled
 * @apiBody {Number} startTimeOfDayInMinutes Start time of the routine in minutes
 * @apiBody {Number} endTimeOfDayInMinutes End time of the routine in minutes
 * @apiBody {Number} difficultyRank Difficulty rank of the routine
 *
 * @apiSuccess {Object} routine Routine object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        ROUTINE OBJECT
 *      }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 401 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError RoutineUpdateFailed Routine update failed
 * @apiErrorExample {json} RoutineUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Update Failed"
 *      }
 */
router.put("/update/:userId/:characterId/:routineId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, characterId, routineId } = req.params;

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

  const available = await isTimeslotAvailableForUpdate(
    daysOfWeek,
    startTimeOfDayInMinutes,
    endTimeOfDayInMinutes,
    parseInt(characterId),
    parseInt(routineId)
  );

  if (!available) {
    return res.status(400).json({ error: "Timeslot is not available" });
  }

  await db.routine
    .update({
      where: {
        id: parseInt(routineId),
      },
      data: {
        title: title,
        description: description,
        daysOfWeek: daysOfWeek,
        startTimeOfDayInMinutes: startTimeOfDayInMinutes,
        endTimeOfDayInMinutes: endTimeOfDayInMinutes,
        difficultyRank: difficultyRank,
      },
    })
    .then((routine) => {
      return res.status(200).json(routine);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Routine Update Failed" });
    });
});
/** @api {put} /routine/complete/:userId/:characterId/:routineId Complete Routine
 *  @apiName CompleteRoutine
 *  @apiGroup Routine
 *
 *  @apiDescription Complete a Routine
 *
 *  @apiParam {String} userId User ID
 *  @apiParam {String} characterId Character ID
 *  @apiParam {String} routineId Routine ID
 *
 *  @apiHeader {String} Authorization Firebase ID Token
 *
 *  @apiSuccess {Object} message Success message
 *  @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "message": "Routine completed successfully"
 *      }
 *  @apiError Unauthorized User is not authorized
 *  @apiErrorExample {json} Unauthorized:
 *      HTTP/1.1 403 Unauthorized
 *      {
 *        "error": "Unauthorized"
 *      }
 *  @apiError RoutineNotFound Routine not found
 *  @apiErrorExample {json} RoutineNotFound:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "Routine not found"
 *      }
 *  @apiError Unauthorized User is not authorized
 *  @apiErrorExample {json} Unauthorized:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *         "error": "Unauthorized"
 *      }
 * @apiError RoutineUpdateLastCompletedDateFailed Routine update last completed date failed
 * @apiErrorExample {json} RoutineUpdateLastCompletedDateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Update Last Completed Date Failed"
 *      }
 *  @apiError RoutineCompletionFailed Routine completion failed
 *  @apiErrorExample {json} RoutineCompletionUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Completion Update Failed"
 *      }
 * @apiError RoutineCompletionFailed Routine completion failed
 * @apiErrorExample {json} RoutineCompletionFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Routine Completion Failed"
 *      }
 * @apiError Updating Character Total Routines Completed Failed
 * @apiErrorExample {json} Updating Character Total Routines Completed Failed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Updating Character Total Routines Completed Failed"
 *      }
 */
router.put("/complete/:userId/:characterId/:routineId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, characterId, routineId } = req.params;

  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const routine = await db.routine.findUnique({
    where: {
      id: parseInt(routineId),
    },
  });

  if (!routine) {
    return res.status(404).json({ error: "Routine not found" });
  }

  await db.routine
    .update({
      where: {
        id: parseInt(routineId),
      },
      data: {
        lastCompleted: new Date(),
      },
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Routine Update Last Completed Date Failed" });
    });

  await db.character
    .update({
      where: {
        id: parseInt(characterId),
      },
      data: {
        experience: {
          increment: routine.experienceReward ? routine.experienceReward : 0,
        },
        gold: {
          increment: routine.goldReward ? routine.goldReward : 0,
        },
        strengthXp: {
          increment: routine.StrengthReward ? routine.StrengthReward : 0,
        },
        defenseXp: {
          increment: routine.DefenseReward ? routine.DefenseReward : 0,
        },
        agilityXp: {
          increment: routine.AgilityReward ? routine.AgilityReward : 0,
        },
        vitalityXp: {
          increment: routine.VitalityReward ? routine.VitalityReward : 0,
        },
        enduranceXp: {
          increment: routine.EnduranceReward ? routine.EnduranceReward : 0,
        },
        willXp: {
          increment: routine.WillReward ? routine.WillReward : 0,
        },
      },
    })
    .then(async () => {
      await db.character
        .update({
          where: {
            id: parseInt(characterId),
          },
          data: {
            TotalRoutinesDone: {
              increment: 1,
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({
            error: "Updating Character Total Routines Completed Failed",
          });
        });
      return res
        .status(200)
        .json({ message: "Routine completed successfully" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "Routine Completion Failed" });
    });
});
/** Checks if time slot is available for a routine to be added
 *
 * @param daysOfWeek     Array of days of the week, represented as integers 1 - 7, where 1 is Sunday, 2 is Monday, etc.
 * @param startTime      Start time of the routine in minutes
 * @param endTime        End time of the routine in minutes
 * @param characterId    ID of the character
 * @returns
 */
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
              lt: endTime,
            },
            endTimeOfDayInMinutes: {
              gt: startTime,
            },
          },
          {
            startTimeOfDayInMinutes: {
              lt: startTime,
            },
            endTimeOfDayInMinutes: {
              gt: startTime,
            },
          },
          {
            startTimeOfDayInMinutes: {
              lt: endTime,
            },
            endTimeOfDayInMinutes: {
              gt: endTime,
            },
          },
        ],
      },
    },
  });

  return overlappingRoutines.length === 0;
}
/** Checks if time slot is available for a routine to be updated
 *
 * @param daysOfWeek     Array of days of the week, represented as integers 1 - 7, where 1 is Sunday, 2 is Monday, etc.
 * @param startTime      Start time of the routine in minutes
 * @param endTime        End time of the routine in minutes
 * @param characterId    ID of the character
 * @param routineId      ID of the routine being updated
 * @returns
 */
async function isTimeslotAvailableForUpdate(
  daysOfWeek: number[],
  startTime: number,
  endTime: number,
  characterId: number,
  routineId: number
) {
  const overlappingRoutines = await db.routine.findMany({
    where: {
      CharacterId: characterId,
      AND: [
        {
          daysOfWeek: {
            hasSome: daysOfWeek,
          },
        },
        {
          OR: [
            {
              startTimeOfDayInMinutes: {
                lt: endTime,
              },
              endTimeOfDayInMinutes: {
                gt: startTime,
              },
            },
            {
              startTimeOfDayInMinutes: {
                lt: startTime,
              },
              endTimeOfDayInMinutes: {
                gt: startTime,
              },
            },
            {
              startTimeOfDayInMinutes: {
                lt: endTime,
              },
              endTimeOfDayInMinutes: {
                gt: endTime,
              },
            },
          ],
        },
      ],
      NOT: {
        id: {
          equals: routineId,
        },
      },
    },
  });

  return overlappingRoutines.length === 0;
}

export { router as routineRouter };
