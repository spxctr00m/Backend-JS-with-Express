const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/dbConfig.js");
const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/", taskRoutes, userRoutes);

const PORT = process.env.PORT;

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}⚡`);
    });
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB✔️");
    });
  } catch (error) {
    console.log(error);
  }
})();
