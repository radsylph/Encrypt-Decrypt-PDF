const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");

//ANCHOR - Settings
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "pug");
app.use("/storage", express.static(path.join(__dirname, "static/public")));

//ANCHOR - Middlewares`
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//LINK - src/routes/index.routes.js:9

//ANCHOR - Router
app.use(require("./routes/index.routes"));

//ANCHOR - Start
// app.listen(4000);
// console.log(`http://localhost:4000`);

// http.createServer(app).listen(8000, () => {
//   console.log("http://localhost:8000/");
// });
var credentials = {
  key: fs.readFileSync(path.join(__dirname, "./cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./cert/cert.pem")),
};
https.createServer(credentials, app).listen(8000, () => {
  console.log("https://localhost:8000/");
});
