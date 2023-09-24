const express = require("express");
const path = require("path");
const app = express();

/*
    EJS: it let us embed JavaScript code in a template language that is then used to generate HTML.
    this module has a good integration with ExpressJS so we don't really need to import through 'require'.
*/
// Settings
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static/public")));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use(require("./routes/index.routes"));

app.listen(4000);
console.log(`http://localhost:4000`);
