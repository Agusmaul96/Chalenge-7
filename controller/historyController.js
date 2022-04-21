const router = require("express").Router();
const { History } = require("../models");

module.exports = {
  History: async (_, res) => {
    const historyData = await History.findAll({});

    res.render("history", {
      histories: historyData,
    });
  },

  // ADD DATA
  addHistory: async (_, res) => {
    res.render("history/add-history");
  },

  newHistory: async (req, res) => {
    await History.create({
      GameId: req.body.gameId,
      playedAt: Date.now(),
      scorePlayer: req.body.scorePlay,
      scoreComputer: req.body.scoreComp,
    });

    res.redirect("/histories");
  },

  // UPDATE DATA
  editHistory: async (req, res) => {
    try {
      const historyData = await History.findByPk(req.params.id);

      res.render("history/edit-history", {
        history: historyData,
      });
    } catch (err) {
      res.status(204).send("Erorr");
    }
  },

  updateHistory: async (req, res) => {
    await History.update(
      {
        GameId: req.body.gameId,
        playedAt: Date.now(),
        scorePlayer: req.body.scorePlay,
        scoreComputer: req.body.scoreComp,
      },
      {
        // where: parseInt(req.body.id),
        where: {
          id: +req.body.id,
        },
      }
    );

    res.redirect("/histories");
  },
  // delete data
  delHistory: async (req, res) => {
    try {
      await History.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/histories");
    } catch (err) {
      console.log(err);
    }
  },
};
