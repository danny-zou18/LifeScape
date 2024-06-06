import express from "express";
import { db } from "../utils/db.server";

const router = express.Router();

router.get("/login", async (req, res) => {
  res.json("testing");
});

export { router as userRouter };
