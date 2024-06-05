import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", async (req, res) => {
  const user = await prisma.users.create({
    data: {
      username: "example_user1",
      email: "example1@example.com",
      name: "Example User",
      hashedPassword: "hashed_password",
    },
  });
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
