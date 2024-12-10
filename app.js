const express = require("express");
const homeRouter = require("./routes/route");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/HOME", homeRouter);

module.exports = app;
