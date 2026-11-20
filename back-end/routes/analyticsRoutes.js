const express = require("express");

const router = express.Router();

const {
    getOverview,
    getTraffic,
    getSources,
    getDevices,
    getTopPages
} = require("../controllers/analyticsController");


router.get("/overview", getOverview);

router.get("/traffic", getTraffic);

router.get("/sources", getSources);

router.get("/devices", getDevices);

router.get("/pages", getTopPages);


module.exports = router;