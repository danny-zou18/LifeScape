import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const { authToken } = req.headers;
    const { userId } = req.params;
    try {
        const authUser = await auth().verifyIdToken(authToken as string);
        if (authUser.uid !== userId) {
            res.status(403).json({error: "Unauthorized"});
        }
    } catch (e) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const userWithCharacter = await db.users.findUnique({
            where: { id: userId },
            include: { character: true },
        })
        if (!userWithCharacter) {
            return res.status(404).json({ error: "User not found" });
        }
        const character = userWithCharacter.character;
        if (!character) {
            return res.json(null);
        }
        res.json(character);
    } catch (e) {
        console.log(e);
        return  res.status(500).json({ error: "Internal Server Error" });
    }




})

export { router as CharacterRouter };
