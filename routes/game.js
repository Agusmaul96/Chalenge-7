const express = require("express");
const router = express.Router();
const game = require("../controller/userController");

const apiRestrict = require("./../middlewares/apiRestrict");

router.get("/game_user", apiRestrict, game.userGame);
// editUpdate
router.get("/usergame/edit/:id", game.editUser);

router.post("/usergame/edit/:id", game.updateUser);
// delete
router.get("/usergame/delete/:id", game.deleteUser);
module.exports = router;
