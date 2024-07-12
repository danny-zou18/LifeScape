const express = require("express");
import { Request, Response, NextFunction } from "express";

const cors = require("cors");

import * as admin from "firebase-admin";
import credentials from "../credentials.json";

import { userRouter } from "./routes/users";
import { CharacterRouter } from "./routes/character";
import { tasksRouter } from "./routes/tasks";
import { habitsRouter } from "./routes/habits";
import { routineRouter } from "./routes/routine";

admin.initializeApp({
  credential: admin.credential.cert(<admin.ServiceAccount>credentials),
});

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/character", CharacterRouter);
app.use("/tasks", tasksRouter);
app.use("/habits", habitsRouter);
app.use("/routine", routineRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
