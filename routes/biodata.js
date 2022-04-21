const express = require("express");
const router = express.Router();
const biodata = require("../controller/biodataController");

router.get("/biodata", biodata.getBiodata);
router.get("/biodata/add", biodata.addBiodata);
router.post("/biodata/post", biodata.newBiodata);
// UPDATE DATA
router.get("/biodata/edit/:id", biodata.editBiodata);

router.post("/biodata/update", biodata.updateBiodata);
// delete data
router.get("/biodata/delete/:id", biodata.deleteBiodata);
module.exports = router;
