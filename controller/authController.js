const { Game } = require("../models");
const passport = require("../lib/passport");

function format(user) {
  const { id, username, email } = user;
  return {
    id,
    username,
    email,
    accessToken: user.generateToken(),
  };
}

module.exports = {
  Signup: (_, res) => {
    res.render("signup");
  },

  register: async (req, res, next) => {
    try {
      await Game.register({
        username: req.body.nama,
        email: req.body.email,
        password: req.body.password,
      });
      res.redirect("/login");
    } catch (err) {
      res.send("Signup Eror");
    }
  },

  Login: (_, res) => {
    res.render("login");
  },

  login: passport.authenticate("local", {
    successRedirect: "/game_user",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  loginAuth: async (req, res) => {
    try {
      const game = await Game.authenticate({
        email: req.body.email,
        password: req.body.password,
      });
      res.redirect("/game_user");
      // const { id, email, password } = game;
      // res.json({
      //   id,
      //   username: game.username,
      //   email: game.email,
      //   token: game.generateToken(),
      // });
    } catch (err) {
      console.log(err);
      res.render("login");
    }
  },

  logout: async (req, res) => {
    try {
      req.logout();
      res.redirect("/login");
    } catch (err) {
      res.send("Error");
    }
  },
};
