import express from "express";
import "dotenv/config";
import "express-async-errors";

import { errorHandler } from "./middleware";
import "./database";
import { variables } from "./utils";
import { authRouter, meetingRouter } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("src/public"));
app.use("/auth", authRouter);
app.use("/meeting", meetingRouter);

app.use(errorHandler);

const PORT = variables.PORT;

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
