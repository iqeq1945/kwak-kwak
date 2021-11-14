import express from "express";
import * as MainServices from "../services/MainServices.js";
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.user);
  res.render("home/index");
});

export default router;
