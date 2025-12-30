const express = require("express");
const controller = require("../controllers/apps.controller");

const router = express.Router();

router.get("/", controller.getApps);
router.post("/add", controller.addApp);
router.delete("/:id", controller.deleteApp);

router.post("/launch", controller.launchApp);

router.get("/:id/icon", controller.getIcon);

router.get("/discover", controller.discoverApps);


module.exports = router;
