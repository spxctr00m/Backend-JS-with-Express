const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");

const connectDB = require("./server/db/connect.js");
const router = require("./server/routes/tasks.js");
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tasks", router);

const PORT = process.env.PORT || 3200;

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}...`);
    });
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
})();
