const express = require("express");
const router = require("express").Router();
const app = express();
const { redirect } = require("express/lib/response");
const { History } = require("./../models");
// folder static
app.use(express.static("assets"));

router.get("/histories", async (_, res) => {
  // const loginData = {
  //   id: 4,
  //   username: 'Vanesa',
  //   password: 'vanesa'
  // }

  const historyData = await History.findAll({
    // where: {
    //   GameId: loginData.id,
    // }
  });

  res.render("history", {
    histories: historyData,
  });
});

// ADD DATA
router.get("/history/add", async (_, res) => {
  res.render("history/add-history");
});

router.post("/history/post", async (req, res) => {
  await History.create({
    GameId: req.body.gameId,
    playedAt: Date.now(),
    scorePlayer: req.body.scorePlay,
    scoreComputer: req.body.scoreComp,
  });

  res.redirect("/histories");
});

// UPDATE DATA
router.get("/history/edit/:id", async (req, res) => {
  const historyData = await History.findByPk(req.params.id);

  res.render("history/edit-history", {
    history: historyData,
  });
});

router.post("/history/update", async (req, res) => {
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
});
// delete data
router.get("/history/delete/:id", async (req, res) => {
  await History.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/histories");
});

module.exports = router;
