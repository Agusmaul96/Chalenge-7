const express = require("express");
const req = require("express/lib/request");
const app = express();

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

// routes
const game = require("./routes/game");
const history = require("./routes/history");
app.use(game);
app.use(history);

// Data All
const { Game, Biodata, History } = require("./models");
app.get("/data", async (_, res) => {
  const data = await Game.findAll({
    include: [Biodata, History],

    // where: {
    //   GameId: 1,
    // },
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
  res.render("history");
});
app.get("/play/game", (req, res) => {
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
  const { Game } = require("./models");
  const user = await Game.create({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
    GameId: req.body.Gameid,
  });
  res.redirect("/dashboard");
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
  const { Game } = require("./models");
  const user = await Game.findAll({
    where: {
      email: req.body.uEmail,
      password: req.body.uPassword,
    },
  }).then(() => {
    isLogin = true;
    res.redirect("/dashboard");

    if (req.body.uEmail === "" && req.body.uPassword === "") {
      res.render("login", {
        error: "masukan akun terlebih dahulu",
        messageClass: "alert-danger",
      });
    } else if (req.body.uPassword === "") {
      res.render("login", {
        error: "Masukan password terlebih dahulu",
        messageClass: "alert-danger",
      });
    }

    return;
  });
});
// Biodata
app.get("/biodata", async (_, res) => {
  const biodataData = await Biodata.findAll({});
  res.render("biodata", {
    biodatas: biodataData,
  });
});

// UPDATE DATA
app.get("/biodata/edit/:id", async (req, res) => {
  const biodataData = await Biodata.findByPk(req.params.id);

  res.render("biodata/edit-biodata", {
    biodatas: biodataData,
  });
});

app.post("/biodata/update", async (req, res) => {
  await Biodata.update(
    {
      GameId: req.body.gameid,
      nama: req.body.namebio,
      kotaAsal: req.body.kotaasal,
    },
    {
      // where: parseInt(req.body.id),
      where: {
        id: +req.body.id,
      },
    }
  );

  res.redirect("/biodata");
});
// delete data
app.get("/biodata/delete/:id", async (req, res) => {
  await Biodata.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/biodata");
});
app.listen(port, () => {
  console.log(`Running http://localhost:${port}`);
});
