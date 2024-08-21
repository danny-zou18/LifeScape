import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

/**
 * @api {post} /add/:userId Add Friend
 * @apiName AddFriend
 * @apiGroup Friends
 *
 * @apiDescription Add a friend for a user.
 *
 * @apiParam {String} userId User ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiBody {String} friendId Friend ID
 *
 * @apiSuccess {Object} message Success message
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200 OK
 *       {
 *         "message": "Friend added"
 *       }
 *
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 *
 * @apiError UserNotFound User not found
 * @apiErrorExample {json} UserNotFound:
 *       HTTP/1.1 404 Not Found
 *       {
 *         "error": "User not found"
 *       }
 *
 * @apiError FriendshipAlreadyExists Friendship already exists
 * @apiErrorExample {json} FriendshipAlreadyExists:
 *       HTTP/1.1 409 Conflict
 *       {
 *         "error": "Friendship already exists"
 *       }
 *
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
router.post("/add/:userId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId } = req.params;
  const { friendUsername } = req.body;

  //Authorize
  try {
    const authUser = await auth().verifyIdToken(authToken as string);
    if (authUser.uid !== userId) {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const friendObj = await db.users.findFirst({
      where: { username: friendUsername },
      select: { id: true },
    });
    const friendId = friendObj?.id;
    if (!friendId) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingFriendship = await db.friendship.findFirst({
      where: {
        OR: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
        status: "FRIENDS",
      },
    });
    if (existingFriendship) {
      return res.status(409).json({ error: "Friendship already exists" });
    }
    const user = await db.users.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await db.friendship.create({
      data: {
        user: { connect: { id: userId } },
        friend: { connect: { id: friendId } },
        status: "PENDING",
      },
    });
    return res.status(200).json({ message: "Friend added" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getFriendRequests/:userId", async (req, res) => {
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

  try {
    const friendRequests = await db.friendship.findMany({
      where: {
        friend_id: userId,
        status: "PENDING",
      },
    });
    return res.status(200).json(friendRequests);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as FriendsRouter };
