const express = require("express");
const path = require("path");
const cors = require("cors")
const appRoutes = require("./routes/app.routes");


const app = express();

app.use(express.json());


app.use(cors())
app.use("/api/apps", appRoutes);

app.use("/public", express.static("public"));



app.use(
  "/Launcher",
  express.static(path.join(__dirname, "../../client/build"))
);

app.get("/Launcher", (req, res) => {
  res.send("Launcher backend is running 🚀");
});


module.exports = app;
