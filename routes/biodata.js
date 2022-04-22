const express = require("express");
const router = express.Router();
const biodata = require("../controller/biodataController");

const apiRestrict = require("./../middlewares/apiRestrict");

router.get("/biodata", apiRestrict, biodata.getBiodata);
router.get("/biodata/add", biodata.addBiodata);
router.post("/biodata/post", biodata.newBiodata);

module.exports = router;
