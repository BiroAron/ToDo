import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import "dotenv/config";

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
      `${process.env.MONGO_BASE_URL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.${process.env.MONGO_HOSTNAME}/`,
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
      console.log(`Server running on ${process.env.HOST + process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
