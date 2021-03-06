import express from "express";
import * as CommentServices from "../services/CommentServices.js";
const router = express.Router();

router.post("/", CommentServices.CreateComment);

router.put("/:commentId", CommentServices.UpdateComment);

router.get("/delete/:commentId", CommentServices.DeleteComment);

router.get("/:commentId", CommentServices.GetComment);

export default router;
