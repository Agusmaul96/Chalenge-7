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
    await Biodata.create({
      GameId: req.body.gameid,
      nama: req.body.namebio,
      kotaAsal: req.body.kotaasal,
    });

    res.redirect("/biodata");
  },

  // UPDATE DATA
  editBiodata: async (req, res) => {
    const biodataData = await Biodata.findByPk(req.params.id);

    res.render("biodata/edit-biodata", {
      biodatas: biodataData,
    });
  },

  updateBiodata: async (req, res) => {
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
  },
  // delete data
  deleteBiodata: async (req, res) => {
    await Biodata.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/biodata");
  },
};
