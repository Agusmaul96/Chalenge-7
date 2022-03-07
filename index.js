const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
// folder static
app.use(express.static("assets"));

const users = require("./db/user.json");
let isLogin = false;

// view engine ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/users", (req, res) => {
  res.json(users);
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

app.post("/signup/post", (req, res) => {
  const users = require("./db/user.json");
  const { name, email, password } = req.body;
  // Request data ke user.json
  const user = users.find((user) => {
    if (user.email === req.body.email) {
      res.render("signup", {
        error: "Email Sudah Terdaftar.",
        messageClass: "alert-danger",
      });
    } else if (req.body.name === "" && req.body.email === "" && req.body.password === "") {
      res.render("signup", {
        error: "Silahkan Isi Terlebih Dahulu",
        messageClass: "alert-danger",
      });
    } else if (req.body.password === "") {
      res.render("signup", {
        error: "Password Masih Kosong",
        messageClass: "alert-danger",
      });
    } else if (req.body.name === "") {
      res.render("signup", {
        error: "Nama Masih Kosong",
        messageClass: "alert-danger",
      });
    } else if (!(users.email === req.body.email)) {
      users.push({
        name,
        email,
        password,
      });
      res.render("login", {
        error: "Akun Berhasil di daftarkan Silahkan Login",
        messageClass: "alert-success",
      });
      // res.json(users);
    }

    return;
  });
});

// API LOGIN
app.post("/login/auth", (req, res) => {
  const users = require("./db/user.json");
  const user = users.find((user) => {
    if (user.email === req.body.uEmail && user.password === req.body.uPassword) {
      isLogin = true;
      res.redirect("/play");
    }
    return user.email === req.body.uEmail && user.password === req.body.uPassword;
  });

  if (!(users.email === req.body.uEmail)) {
    res.render("login", {
      error: "email atau password yang kamu masukan salah",
      messageClass: "alert-danger",
    });
  }
});

app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});
