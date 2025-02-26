const express = require("express");
const path = require("path");
const sessions = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(sessions({
    secret: process.env.SESSIONSECRET,
    name: "sessionID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
}));

// Route for the homepage
app.get("/", (req, res) => {
    res.render("index"); // Render a homepage
});

app.use("/admin", require("./components/admin/routes"));
app.use("/projects", require("./components/projects/routes"));
app.use("/skills", require("./components/skills/routes"));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
