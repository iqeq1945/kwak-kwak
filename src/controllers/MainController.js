import express from "express";
import * as PostServices from "../services/PostServices.js";
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
router.get("/write", function (req, res) {
  res.render("home/write");
});
router.get("/community", PostServices.GetPostList);

router.post("/test", function (req, res) {
  console.log(req.body);
});

export default router;
