const express = require("express");
const path = require("path");
const app = express();

//ANCHOR - Settings
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "pug");
app.use("/storage", express.static(path.join(__dirname, "static/public")));

//ANCHOR - Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//LINK - src/routes/index.routes.js:9

//ANCHOR - Router
app.use(require("./routes/index.routes"));

app.listen(4000);
console.log(`http://localhost:4000`);
