import express from "express";
import * as MainServices from "../services/MainServices.js";
const router = express.Router();

router.get("/", function (req, res) {
  console.log(MainServices.Test());
  res.render("home/index");
});

export default router;
