import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

const MONGO_URL =
  "mongodb+srv://biroaron:123@cluster0.y7nbxkk.mongodb.net/ToDo?retryWrites=true&w=majority";

mongoose.Promise = Promise;

// const connectOptions: mongoose.ConnectOptions = {
//   dbName: 'todo_Biro_Aron',
// };

mongoose
  .connect(MONGO_URL /*, connectOptions*/)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/", router);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
