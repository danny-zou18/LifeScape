import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

/** @api {post} /habits/create/:userId/:characterId Create Habit
 *  @apiName CreateHabit
 *  @apiGroup Habit
 *
 * @apiDescription Create a habit for a character
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} title Title of the habit
 * @apiBody {String} description Description of the habit
 * @apiBody {String} repeat Repeat of the habit
 * @apiBody {Number?} if Repeat is weekly, completionGoalWeekly Weekly completion goal of the habit
 * @apiBody {Number?} if Repeat is monthly, completionGoalMonthly Monthly completion goal of the habit
 * @apiBody {Boolean} quitting Quitting status of the habit
 * @apiBody {Number} difficultyRank Difficulty rank of the habit
 *
 * @apiSuccess {Object} habit Habit object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 *      {
 *        HABIT OBJECT
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
 * @apiError HabitCreationFailed Habit creation failed
 * @apiErrorExample {json} HabitCreationFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Habit Creation Failed"
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
    .then((habit) => {
      return res.status(201).json(habit);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Habit Creation Failed" });
    });
});

/** @api {get} /habits/get/:userId/:characterId Get Habits
 *  @apiName GetHabits
 *  @apiGroup Habit
 *
 * @apiDescription Get all habits for a character
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} habits Array of habit objects
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        HABIT OBJECT[]
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
 * @apiError GetHabitsFailed Failed to get habits
 * @apiErrorExample {json} GetHabitsFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Failed to get habits"
 *      }
 */
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

/** @api {put} /habits/delete/:userId/:habitId Delete Habit
 *  @apiName DeleteHabit
 *  @apiGroup Habit
 *
 * @apiDescription Delete a habit
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} habitId Habit ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object} habit Habit object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        sucess: "Habit deleted"
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
 * @apiError HabitUpdateFailed Habit update failed
 * @apiErrorExample {json} HabitUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Failed to delete habit"
 *      }
 */
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

/** @api {put} /habits/update/:userId/:habitId Update Habit
 *  @apiName UpdateHabit
 *  @apiGroup Habit
 *
 * @apiDescription Update a habit
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} habitId Habit ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} title Title of the habit
 * @apiBody {String} description Description of the habit
 * @apiBody {String} repeat Repeat of the habit
 * @apiBody {Number?} if Repeat is weekly, completionGoalWeekly Weekly completion goal of the habit
 * @apiBody {Number?} if Repeat is monthly, completionGoalMonthly Monthly completion goal of the habit
 * @apiBody {Boolean} quitting Quitting status of the habit
 * @apiBody {Number} difficultyRank Difficulty rank of the habit
 *
 * @apiSuccess {Object} habit Habit object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        HABIT OBJECT
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
 * @apiError HabitUpdateFailed Habit update failed
 * @apiErrorExample {json} HabitUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Failed to update habit"
 *      }
 */
router.put("/update/:userId/:habitId", async (req, res) => {
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
    .update({
      where: {
        id: parseInt(habitId),
      },
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
      },
    })
    .then((habit) => {
      return res.status(200).json(habit);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Failed to update habit" });
    });
});
/** @api {put} /habits/complete/:userId/:characterId/:habitId Complete Habit
 *  @apiName CompleteHabit
 *  @apiGroup Habit
 *
 *  @apiDescription Complete a Habit
 *
 *  @apiParam {String} userId User ID
 *  @apiParam {String} characterId Character ID
 *  @apiParam {String} habitId Habit ID
 *
 *  @apiHeader {String} Authorization Firebase ID Token
 *
 *  @apiSuccess {Object} message Success message
 *  @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "message": "Habit completed successfully"
 *      }
 *  @apiError Unauthorized User is not authorized
 *  @apiErrorExample {json} Unauthorized:
 *      HTTP/1.1 403 Unauthorized
 *      {
 *        "error": "Unauthorized"
 *      }
 *  @apiError HabitNotFound Habit not found
 *  @apiErrorExample {json} HabitNotFound:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "Habit not found"
 *      }
 *  @apiError Unauthorized User is not authorized
 *  @apiErrorExample {json} Unauthorized:
 *      HTTP/1.1 401 Unauthorized
 *      {
 *         "error": "Unauthorized"
 *      }
 *  @apiError HabitCompletionFailed Task completion failed
 *  @apiErrorExample {json} HabitCompletionUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Habit Completion Update Failed"
 *      }
 * @apiError HabitCompletionFailed Habit completion failed
 * @apiErrorExample {json} HabitCompletionFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Habit Completion Failed"
 *      }
 */
router.put("/complete/:userId/:characterId/:habitId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, characterId, habitId } = req.params;
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const habit = await db.habit.findUnique({
    where: {
      id: parseInt(habitId),
    },
  });

  if (!habit) {
    return res.status(404).json({ error: "Habit not found" });
  }

  const current = new Date();
  const future = new Date(current.getTime() + 24 * 60 * 60 * 1000);

  await db.habit
    .update({
      where: {
        id: parseInt(habitId),
      },
      data: {
        lastCompleted: current,
        completeBy: future,
        totalCompletion: {
          increment: 1,
        },
        streak: {
          increment: 1,
        },
      },
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Habit Completion Failed" });
    });

  if (habit.repeat === "WEEKLY" && habit.completionGoalWeekly) {
    const currentCompletions = habit.currentCompletions + 1;
    if (currentCompletions >= habit.completionGoalWeekly) {
      // Handle completion goal reached for weekly habit
    }
    // Update current completions for weekly habit
    await db.habit.update({
      where: {
        id: parseInt(habitId),
      },
      data: {
        currentCompletions: currentCompletions,
      },
    });
  } else if (habit.repeat === "MONTHLY" && habit.completionGoalMonthly) {
    const currentCompletions = habit.currentCompletions + 1;
    if (currentCompletions >= habit.completionGoalMonthly) {
      // Handle completion goal reached for monthly habit
    }
    // Update current completions for monthly habit
    await db.habit.update({
      where: {
        id: parseInt(habitId),
      },
      data: {
        currentCompletions: currentCompletions,
      },
    });
  }

  await db.character
    .update({
      where: {
        id: parseInt(characterId),
      },
      data: {
        experience: {
          increment: habit.experienceReward ? habit.experienceReward : 0,
        },
        gold: {
          increment: habit.goldReward ? habit.goldReward : 0,
        },
        strengthXp: {
          increment: habit.StrengthReward ? habit.StrengthReward : 0,
        },
        defenseXp: {
          increment: habit.DefenseReward ? habit.DefenseReward : 0,
        },
        agilityXp: {
          increment: habit.AgilityReward ? habit.AgilityReward : 0,
        },
        vitalityXp: {
          increment: habit.VitalityReward ? habit.VitalityReward : 0,
        },
        enduranceXp: {
          increment: habit.EnduranceReward ? habit.EnduranceReward : 0,
        },
        willXp: {
          increment: habit.WillReward ? habit.WillReward : 0,
        },
      },
    })
    .then(() => {
      return res.status(200).json({ message: "Habit completed successfully" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "Habit Completion Failed" });
    });
});

export { router as habitsRouter };
