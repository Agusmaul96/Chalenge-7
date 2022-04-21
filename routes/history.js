const router = require("express").Router();
const history = require("../controller/historyController");

router.get("/histories", history.History);

// ADD DATA
router.get("/history/add", history.addHistory);

router.post("/history/post", history.newHistory);

// UPDATE DATA
router.get("/history/edit/:id", history.editHistory);

router.post("/history/update", history.updateHistory);
// delete data
router.get("/history/delete/:id", history.delHistory);

module.exports = router;
