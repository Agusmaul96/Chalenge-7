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

  // UPDATE DATA
  editBiodata: async (req, res) => {
    try {
      const userData = await Game.findByPk(req.params.id, {
        include: [
          {
            model: Biodata,
            as: "Biodata",
          },
        ],
      });
      res.render("biodata/edit-biodata", {
        dataUser: userData,
      });
    } catch (err) {
      res.status(204).send("Erorr");
    }
  },

  updateBiodata: async (req, res) => {
    try {
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
    } catch (err) {
      res.send(400);
    }
  },
  // delete data
  deleteBiodata: async (req, res) => {
    try {
      await Biodata.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (err) {
      console.log(err);
    }

    res.redirect("/biodata");
  },
};
