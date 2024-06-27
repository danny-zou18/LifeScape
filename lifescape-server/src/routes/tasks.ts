import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

/** @api {post} /tasks/create/:userId/:characterId Create Task
 *  @apiName CreateTask
 *  @apiGroup Task
 *
 * @apiDescription Create a task for a character
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} title Title of the task
 * @apiBody {String} description Description of the task
 * @apiBody {Date} dueDate Due date of the task
 * @apiBody {DifficultyRank} difficultyRank Difficulty rank of the task
 *
 * @apiSuccess {Object} task Task object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 *      {
 *        TASK OBJECT
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
 * @apiError TaskCreationFailed Task creation failed
 * @apiErrorExample {json} TaskCreationFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Task Creation Failed"
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

  const { title, description, dueDate, difficultyRank } = req.body;

  await db.task
    .create({
      data: {
        title: title,
        description: description,
        dueDate: dueDate,
        difficultyRank: difficultyRank,
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

/** @api {get} /tasks/get/:userId/:characterId Get Tasks
 *  @apiName GetTasks
 *  @apiGroup Task
 *
 * @apiDescription Get all tasks for a character
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} characterId Character ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} tasks List of task objects
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        TASK OBJECTS
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

/** @api {delete} /tasks/delete/:userId/:taskId Delete Task
 *  @apiName DeleteTask
 *  @apiGroup Task
 *
 * @apiDescription Delete a task
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} taskId Task ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object} message Success message
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "message": "Task deleted successfully"
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

/** @api {put} /tasks/update/:userId/:taskId Update Task
 *  @apiName UpdateTask
 *  @apiGroup Task
 *
 * @apiDescription Update a task
 *
 * @apiParam {String} userId User ID
 * @apiParam {String} taskId Task ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} title Title of the task
 * @apiBody {String} description Description of the task
 * @apiBody {Date} dueDate Due date of the task
 * @apiBody {DifficultyRank} difficultyRank Difficulty rank of the task
 *
 * @apiSuccess {Object} task Task object
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        TASK OBJECT
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
 * @apiError TaskUpdateFailed Task update failed
 * @apiErrorExample {json} TaskUpdateFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "Task Update Failed"
 *      }
 */
router.put("/update/:userId/:taskId", async (req, res) => {
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

  const { title, description, dueDate, difficultyRank } = req.body;

  await db.task
    .update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        title: title,
        description: description,
        dueDate: dueDate,
        difficultyRank: difficultyRank,
      },
    })
    .then((task) => {
      return res.status(200).json(task);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Task Update Failed" });
    });
});

export { router as tasksRouter };
