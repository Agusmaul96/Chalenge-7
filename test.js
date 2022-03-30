const { Game, Biodata, History } = require("./models");
const game = require("./models/game");

// Game.create({
//   username: "andi",
//   email: "andi@gmail.com",
//   password: "12345",
// });

// Biodata.create({
//   GameId: 1,
//   nama: "agus",
//   kotaAsal: "serang",
// });

// game
//   .update({
//     where: {
//       id: 34,
//     },
//   })
//   .then(() => console.log("data 1 di hapus"));

Game.update(
  {
    GameId: 2,
  },
  {
    where: {
      id: "2",
    },
  }
);
// History.update(
//   {
//     id: 1,
//   },
//   {
//     where: {
//       GameId: 1,
//     },
//   }
// );
// History.create({
//   playedAt: Date.now(),
//   scorePlayer: 70,
//   scoreComputer: 80,
//   GameId: 1,
// });

// History.create({
//   playedAt: Date.now(),
//   score: 90,
//   GameId: 1,
// });
