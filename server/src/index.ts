import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import { environmentVariables } from "../config";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use("/", router);

mongoose.Promise = Promise;

const connectOptions: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
  dbName: "ToDo",
};

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      `${environmentVariables.mongo_base_url}://${environmentVariables.mongo_user}:${environmentVariables.mongo_password}@${environmentVariables.mongo_cluster}.${environmentVariables.mongo_hostname}/`,
      connectOptions
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on ${
          environmentVariables.host + environmentVariables.port
        }`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
