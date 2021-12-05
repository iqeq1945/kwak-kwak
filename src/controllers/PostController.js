import express from "express";
import * as PostServices from "../services/PostServices.js";

const router = express.Router();

router.post("/", PostServices.CreatePost);

router.patch("/:postId", PostServices.UpdatePost);

router.get("/:postId", PostServices.GetPostInfo);

router.delete("/:postId", PostServices.DeletePost);

router.post("/like", PostServices.OnLike);

router.post("/unlike", PostServices.OnUnLike);
export default router;
