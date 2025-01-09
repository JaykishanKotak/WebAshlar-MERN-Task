import mongoose from "mongoose";
import { variables } from "#/utils";

const URI = variables.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected Successfully !!!");
  })
  .catch((err) => {
    console.log("Something Went Wrong, DB Connection Failed !!! ", err);
  });
