import express from "express";
import * as UserServices from "../services/UserServices.js";
import * as ProfileServices from "../services/ProfileServices.js";
const router = express.Router();

router.get("/", function (req, res) {
  res.render("home/signup");
});
router.post("/", UserServices.SignUp, function (req, res) {
  res.redirect("home/index");
});
router.post("/login", UserServices.LogIn, function (req, res) {
  console.log(req.user);
  res.redirect("home/index");
});
router.get("/logout", UserServices.LogOut, function (req, res) {
  res.json({ ok: true });
});

router.get("/:id", UserServices.GetUser, function (req, res) {
  console.log(req.userData);
  res.render("home/mypage", {
    user: req.userData,
  });
});
export default router;
