import express from "express";
import { db } from "../utils/db.server";

import { getAuth } from "firebase-admin/auth";

const router = express.Router();

/** @api {post} /users/register Register User
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiDescription Register a user
 *
 * @apiBody {String} name Name of the user
 * @apiBody {String} username Username of the user
 * @apiBody {String} email Email of the user
 * @apiBody {String} password Password of the user
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} newUser New user object
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User Registered Successfully!",
 *       "success": true,
 *       "user": USEROBJECT
 *     }
 * @apiError UsernameAlreadyExists Username already exists
 * @apiErrorExample {json} UsernameAlreadyExists:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Username already exists"
 *    }
 * @apiError EmailAlreadyExists Email already exists
 * @apiErrorExample {json} EmailAlreadyExists:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Email already exists"
 *   }
 * @apiError UserCreationFailed User creation failed
 * @apiErrorExample {json} UserCreationFailed:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "User Creation Failed"
 *   }
 */
router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;

  const checkUsername = await db.users.findUnique({
    where: {
      username: username,
    },
  });
  if (checkUsername) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const checkEmail = await db.users.findUnique({
    where: {
      email: email,
    },
  });
  if (checkEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  getAuth()
    .createUser({
      email: email,
      password: password,
    })
    .then(async (userRecord) => {
      await db.users
        .create({
          data: {
            id: userRecord.uid,
            username: username,
            email: email,
            name: name,
          },
        })
        .then((user) => {
          return res.status(200).json({
            message: "User Registered Successfully!",
            success: true,
            newUser: user,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ error: "User Creation Failed" });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "User Creation Failed" });
    });
});

/** @api {get} /users/:id Get User
 *  @apiName GetUser
 *  @apiGroup User
 *
 *  @apiDescription Get a user by ID
 *
 *  @apiParam {String} id User ID
 *
 *  @apiSuccess {String} message Success message
 *  @apiSuccess {Boolean} success Success status
 *  @apiSuccess {Object} user User object
 *  @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "message": "User Found",
 *        "success": true,
 *        "user": USEROBJECT
 *      }
 *  @apiError UserNotFound User not found
 *  @apiErrorExample {json} UserNotFound:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "User not found"
 *      }
 *  @apiError UserFetchFailed User fetch failed
 *  @apiErrorExample {json} UserFetchFailed:
 *      HTTP/1.1 400 Bad Request
 *      {
 *        "error": "User Fetch Failed"
 *      }
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await db.users
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "User Fetch Failed" });
    });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json({ message: "User Found", success: true, user });
});

export { router as userRouter };
