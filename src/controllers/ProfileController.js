import express from "express";
import * as ProfileServices from "../services/ProfileServices.js";
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.user);
  res.render("home/profile");
});
router.post("/", ProfileServices.Create, function (req, res) {
  console.log(Profile);
  res.json({ ok: true });
});

router.get("/:id", ProfileServices.GetProfile);

export default router;
