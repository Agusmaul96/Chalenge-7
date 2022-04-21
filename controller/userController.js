const { Game, Biodata, History } = require("../models");

module.exports = {
  userGame: async (_, res) => {
    try {
      const data = await Game.findAll({
        include: [
          {
            model: Biodata,
            as: "Biodata",
          },
          History,
        ],
      });
      res.render("user", {
        users: data,
      });
      // res.json(data);
    } catch (err) {
      res.status(204).send("Data Tidak Di Temukan");
    }
  },

  editUser: async (req, res) => {
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
      console.log("erorrrrr");
    }
  },

  updateUser: async (req, res) => {
    try {
      const game = await Game.update(
        {
          username: req.body.user_name,
          email: req.body.email,
        },
        {
          where: {
            id: req.body.gameid,
            // id: req.body.id
          },
        },
        await Biodata.update(
          {
            nama: req.body.namabio,
            kotaAsal: req.body.kota_asal,
          },
          {
            where: {
              GameId: req.params.id,
              // id: req.body.id
            },
          }
        )
      );
      res.redirect("/game_user");
    } catch (err) {
      res.status(204).send("Udate Eror");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const game = await Game.destroy({
        where: {
          id: req.params.id,
        },
      });
      await Biodata.destroy({
        where: {
          GameId: req.params.id,
        },
      });
      await History.destroy({
        where: {
          GameId: req.params.id,
        },
      });
      res.redirect("/game_user");
    } catch (err) {
      res.status(204).send("Delete Eror");
    }
  },
};
