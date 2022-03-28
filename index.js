const express = require("express");
const app = express();
const { game, Biodata, History } = require("./models");
// const game = require("./routes/game");
// const history = require("./routes/history");
let isLogin = false;
const port = 8080;
// view engine ejs
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// folder static
app.use(express.static("assets"));

// app.use(game);
// app.use(history);

// app.get("/users", async (_, res) => {
//   res.json(await users.findAll());
// });

app.get("/data", async (_, res) => {
  const data = await game.findAll({
    // include: [Biodata, History],
  });
  res.json(data);
});
// Home
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", (req, res) => {
  res.render("index");
});

// Player Req Play
app.use((req, res, next) => {
  // isLogin = false;
  // !isLogin = true;
  if (req.url === "/play" && !isLogin) {
    res.redirect("login");
  }
  next();
});

// Game
app.get("/play", (req, res) => {
  res.render("game");
});

//PAGE Sign Up
app.get("/signup", (req, res) => {
  res.render("signup", {
    error: "",
  });
});

//LOGIN
app.get("/login", (req, res) => {
  res.render("login", {
    error: "",
  });
});

// Daftar Akun Baru

app.post("/signup/post", async (req, res) => {
  const { game } = require("./models");
  const user = await game.create({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.redirect("/login");
  // res.status(201).json(user);

  // const user = await Game.findAll((user) => {
  //   if (user.email === req.body.email) {
  //     res.render("signup", {
  //       error: "Email Sudah Terdaftar.",
  //       messageClass: "alert-danger",
  //     });
  //   } else if (req.body.name === "" && req.body.email === "" && req.body.password === "") {
  //     res.render("signup", {
  //       error: "Silahkan Isi Terlebih Dahulu",
  //       messageClass: "alert-danger",
  //     });
  //   } else if (req.body.email === "") {
  //     res.render("signup", {
  //       error: "Email Masih Kosong",
  //       messageClass: "alert-danger",
  //     });
  //   } else if (req.body.password === "") {
  //     res.render("signup", {
  //       error: "Password Masih Kosong",
  //       messageClass: "alert-danger",
  //     });
  //   } else if (req.body.name === "") {
  //     res.render("signup", {
  //       error: "Nama Masih Kosong",
  //       messageClass: "alert-danger",
  //     });
  //   } else if (!(Game.email === req.body.email)) {
  //     Game.create({
  //       username: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //     res.render("login", {
  //       error: "Akun Berhasil di daftarkan Silahkan Login",
  //       messageClass: "alert-success",
  //     });
  //     // res.json(user);
  //   }
  //   return;
  // });
});

// API LOGIN
app.post("/login/auth", async (req, res) => {
  const { game } = require("./models");
  const user = await game
    .findAll({
      where: {
        email: req.body.uEmail,
        password: req.body.uPassword,
      },
    })
    .then(() => {
      isLogin = true;
      res.redirect("/play");
    });
  // if (user.email === req.body.uEmail && user.password === req.body.uPassword) {
  //   isLogin = true;
  //   res.redirect("/play");
  // } else if (req.body.uEmail === "" && req.body.uPassword === "") {
  //   res.render("login", {
  //     error: "masukan akun terlebih dahulu",
  //     messageClass: "alert-danger",
  //   });
  // } else if (req.body.uPassword === "") {
  //   res.render("login", {
  //     error: "Masukan password terlebih dahulu",
  //     messageClass: "alert-danger",
  //   });
  // } else if (!(user.email === req.body.uEmail) && user.password === req.body.uPassword) {
  //   res.render("login", {
  //     error: "email yang kamu masukan salah",
  //     messageClass: "alert-danger",
  //   });
  // } else if (user.email === req.body.uEmail && !(user.password === req.body.uPassword)) {
  //   res.render("login", {
  //     error: "password yang kamu masukan salah",
  //     messageClass: "alert-danger",
  //   });
  // } else if (!(user.email === req.body.uEmail)) {
  //   res.render("login", {
  //     error: "Akun belum terdaftar ",
  //     messageClass: "alert-danger",
  //   });
  // }
  // return;
});

app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});
