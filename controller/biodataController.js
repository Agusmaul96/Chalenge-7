const { Game, Biodata, History } = require("../models");

module.exports = {
  getBiodata: async (_, res) => {
    try {
      const biodataData = await Biodata.findAll();
      res.render("biodata", {
        biodata: biodataData,
      });
    } catch (err) {
      res.status(500).json();
    }
  },

  addBiodata: async (req, res) => {
    res.render("biodata/add-biodata");
  },

  newBiodata: async (req, res) => {
    try {
      await Biodata.create({
        GameId: req.body.gameid,
        nama: req.body.namebio,
        kotaAsal: req.body.kotaasal,
      });
    } catch (err) {
      res.status(400);
    }

    res.redirect("/biodata");
  },
};
