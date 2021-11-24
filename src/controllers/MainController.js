import express from "express";
import * as MainServices from "../services/MainServices.js";
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.user);
  res.render("home/index");
});
router.get("/signup", function (req, res) {
  console.log(req.user);
  res.render("home/signup");
});
router.get("/login", function (req, res) {
  console.log(req.user);
  res.render("home/login");
});

export default router;
