"use strict";
const { Model } = require("sequelize");
/* Pertama, kita import bcrypt untuk melakukan enkripsi */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasOne(models.Biodata, {
        foreignKey: "GameId",
        as: "Biodata",
      });
      Game.hasMany(models.History);
      // Game.hasMany(models.History);
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = ({ email, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ email, password: encryptedPassword });
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    generateToken = () => {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        username: this.username,
        email: this.email,
        kotaAsal: "Serang",
      };

      const rahasia = "rahasia sekali";

      const token = jwt.sign(payload, rahasia);
      return token;
    };
    /* Method Authenticate, untuk login */
    static authenticate = async ({ email, password }) => {
      try {
        const user = await this.findOne({ where: { email } });
        if (!user) return Promise.reject("User not found!");

        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong password");

        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  Game.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
