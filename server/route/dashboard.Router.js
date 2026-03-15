const express = require("express");
const { DashboardCount } = require("../controller/dashboardController");

const router = express.Router();

router.get("/count", DashboardCount);

module.exports = router;