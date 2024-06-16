import express from "express";
import { db } from "../utils/db.server";

import { auth } from "firebase-admin";

const router = express.Router();

export { router as routineRouter };