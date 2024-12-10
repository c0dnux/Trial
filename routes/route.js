const express = require("express");
const homeController = require("./../controllers/controller");
const router = express.Router();
router.param("id", homeController.checkId);
router.route("/").get(homeController.getAll).post(homeController.addOne);
router.route("/:id").get(homeController.getOne).put(homeController.updateOne);
module.exports = router;
