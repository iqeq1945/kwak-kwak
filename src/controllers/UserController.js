import express from "express";
import * as UserServices from "../services/UserServices.js";
const router = express.Router();

router.get("/", function (req, res) {
  res.render("home/signup");
});
router.post("/", UserServices.SignUp, function (req, res) {
  console.log(signUp);
  res.json({ ok: true });
});
router.post("/login", UserServices.LogIn, function (req, res) {
  console.log(req.user);
  res.json({ ok: true });
});
router.get("/logout", UserServices.LogOut, function (req, res) {
  res.json({ ok: true });
});

export default router;
