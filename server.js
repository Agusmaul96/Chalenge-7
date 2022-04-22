const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const { PORT = 8000 } = process.env;

// view engine ejs
app.set("view engine", "ejs");
app.set("views", "views");

// folder static
app.use(express.static("assets"));
// =====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

// local strategy
const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

// jwt
const jwtPassport = require("./lib/jwtPassport");
app.use(jwtPassport.initialize());

// flassh
app.use(flash());

const restrict = require("./middlewares/restrict");
const apiRestrict = require("./middlewares/apiRestrict");

// routes
const game = require("./routes/game");
const history = require("./routes/history");
const biodata = require("./routes/biodata");
const auth = require("./routes/auth");

app.use(game);
app.use(history);
app.use(biodata);
app.use(auth);

const { Game, Biodata, History } = require("./models");
app.get("/data", async (_, res) => {
  const data = await Game.findAll({
    include: [
      {
        model: Biodata,
        as: "Biodata",
      },
      History,
    ],
  });
  res.json(data);
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", (req, res) => {
  res.render("index");
});

// Game
app.get("/play", (req, res) => {
  res.render("login", { error: "" });
});
app.get("/play/game", (req, res) => {
  res.render("game");
});

app.listen(PORT, () => {
  console.log(`Running http://localhost:${PORT}`);
});
