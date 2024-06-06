const express = require('express');
import { userRouter } from "./routes/users";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

