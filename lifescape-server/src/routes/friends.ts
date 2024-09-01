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
        user_username: user.username,
        friend_username: friendUsername,
        status: "PENDING",
      },
    });
    return res.status(200).json({ message: "Friend added" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @api {get} /getFriendRequests/:userId Get Friend Requests
 * @apiName GetFriendRequests
 * @apiGroup Friends
 *
 * @apiDescription Get friend requests for a user.
 *
 * @apiParam {String} userId User ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} friendRequests List of friend requests
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200 OK
 *       [
 *         {
 *           "id": 1,
 *           "user_id": "user-id",
 *           "friend_id": "friend-id",
 *           "user_username": "user-username",
 *           "friend_username": "friend-username",
 *           "status": "PENDING"
 *         }
 *       ]
 *
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 *
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
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

/**
 * @api {post} /accept/:userId Accept Friend Request
 * @apiName AcceptFriendRequest
 * @apiGroup Friends
 *
 * @apiDescription Accept a friend request for a user.
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
 *         "message": "Friend request accepted"
 *       }
 *
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 *
 * @apiError FriendshipNotFound Friendship not found
 * @apiErrorExample {json} FriendshipNotFound:
 *       HTTP/1.1 404 Not Found
 *       {
 *         "error": "Friendship not found"
 *       }
 *
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
router.post("/accept/:userId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId } = req.params;
  const { friendId } = req.body;

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
    const friendship = await db.friendship.findFirst({
      where: {
        user_id: friendId,
        friend_id: userId,
        status: "PENDING",
      },
    });
    if (!friendship) {
      return res.status(404).json({ error: "Friendship not found" });
    }
    await db.friendship.update({
      where: { id: friendship.id },
      data: { status: "FRIENDS" },
    });
    return res.status(200).json({ message: "Friend request accepted" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @api {post} /reject/:userId Reject Friend Request
 * @apiName RejectFriendRequest
 * @apiGroup Friends
 *
 * @apiDescription Reject a friend request for a user.
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
 *         "message": "Friend request rejected"
 *       }
 *
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 *
 * @apiError FriendshipNotFound Friendship not found
 * @apiErrorExample {json} FriendshipNotFound:
 *       HTTP/1.1 404 Not Found
 *       {
 *         "error": "Friendship not found"
 *       }
 *
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
router.post("/reject/:userId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId } = req.params;
  const { friendId } = req.body;

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
    const friendship = await db.friendship.findFirst({
      where: {
        user_id: friendId,
        friend_id: userId,
        status: "PENDING",
      },
    });
    if (!friendship) {
      return res.status(404).json({ error: "Friendship not found" });
    }
    await db.friendship.delete({ where: { id: friendship.id } });
    return res.status(200).json({ message: "Friend request rejected" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @api {get} /getFriends/:userId Get Friends
 * @apiName GetFriends
 * @apiGroup Friends
 *
 * @apiDescription Get friends for a user.
 *
 * @apiParam {String} userId User ID
 *
 * @apiHeader {String} Authorization Firebase ID Token
 *
 * @apiSuccess {Object[]} friends List of friends
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200 OK
 *       [
 *         {
 *           "id": 1,
 *           "user_id": "user-id",
 *           "friend_id": "friend-id",
 *           "user_username": "user-username",
 *           "friend_username": "friend-username",
 *           "status": "FRIENDS"
 *         }
 *       ]
 *
 * @apiError Unauthorized User is not authorized
 * @apiErrorExample {json} Unauthorized:
 *       HTTP/1.1 403 Unauthorized
 *       {
 *         "error": "Unauthorized"
 *       }
 *
 * @apiError InternalServerError Internal Server Error
 * @apiErrorExample {json} InternalServerError:
 *       HTTP/1.1 500 Internal Server Error
 *       {
 *         "error": "Internal Server Error"
 *       }
 */
router.get("/getFriends/:userId", async (req, res) => {
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
    const friends = await db.friendship.findMany({
      where: {
        OR: [
          { user_id: userId, status: "FRIENDS" },
          { friend_id: userId, status: "FRIENDS" },
        ],
      },
    });
    return res.status(200).json(friends);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getFriend/:userId/:friendId", async (req, res) => {
  const authToken = req.headers.authorization;
  const { userId, friendId } = req.params;

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
    const friendWithCharacter = await db.users.findUnique({
      where: { id: friendId },
      include: { character: true },
    });
    if (!friendWithCharacter) {
      return res.status(404).json({ error: "User not found" });
    }
    const friendCharacter = friendWithCharacter.character;
    if (!friendCharacter) {
      return res.status(200).json(null);
    }
    res.status(200).json(friendCharacter);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as FriendsRouter };
