const express = require("express");
import { Request, Response, NextFunction } from "express";
const cors = require("cors");
import { userRouter } from "./routes/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
