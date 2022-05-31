const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauces");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const validate = require("../middlewares/validate-input");

router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, validate.id, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put(
  "/:id",
  auth,
  multer,
  validate.id,
  validate.sauce,
  sauceCtrl.modifySauce
);
router.delete("/:id", auth, validate.id, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, validate.id, validate.like, sauceCtrl.likeSauce);

module.exports = router;
