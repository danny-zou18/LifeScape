import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

/** @api {get} /character/get/:userId Get Character
 *  @apiName GetCharacter
 *  @apiGroup Character
 *
 * @apiDescription Get a character using user id
 *
 * @apiParam {String} userId User ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object} character Character object
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200 OK
 *       {
 *         CHARACTER OBJECT
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError UserNotFound User not found
 * @apiErrorExample {json} UserNotFound:
 *       HTTP/1.1 404 Not Found
 *       {
 *         "error": "User not found"
 *       }
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
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
    console.log(character);
    if (!character) {
      return res.status(200).json(null);
    }
    res.status(200).json(character);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/** @api {post} /character/create/:userId Create Character
 *  @apiName CreateCharacter
 *  @apiGroup Character
 *
 * @apiDescription Create a character using user id
 *
 * @apiParam {String} userId User ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 * 
 * @apiBody {String} name Character Name
 *
 * @apiSuccess {Object} character Character object
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201 OK
 *       {
 *         CHARACTER OBJECT
 *       }
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 * @apiError UserNotFound User not found
 * @apiErrorExample {json} UserNotFound:
 *       HTTP/1.1 404 Not Found
 *       {
 *         "error": "User not found"
 *       }
 * @apiError UserAlreadyHasCharacter User already has a character
 * @apiErrorExample {json} UserAlreadyHasCharacter:
 *       HTTP/1.1 404 Not Found
 *       {
 *         "error": "User already has a character"
 *       }
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
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
      return res.status(201).json(character);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
});

export { router as CharacterRouter };
