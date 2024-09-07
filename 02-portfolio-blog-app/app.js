require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/router"));

const PORT = 5001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
