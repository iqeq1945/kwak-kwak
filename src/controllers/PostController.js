import express from "express";
import * as PostServices from "../services/PostServices.js";

const router = express.Router();

router.post("/", PostServices.CreatePost);

router.put("/:postId", PostServices.UpdatePost);

router.get("/:postId", PostServices.GetPostInfo);

router.get("/delete/:postId", PostServices.DeletePost);
router.get("/update/:postId", PostServices.UpdatePostInfo);
router.get("/like/:postId", PostServices.OnLike);

router.get("/unlike/:postId", PostServices.OnUnLike);
export default router;
