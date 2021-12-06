import * as CommentRepository from "../repositories/CommentRepository.js";
import { dbNow } from "../utils/dayUtils.js";

import resFormat from "../utils/resFormat.js";

export const CreateComment = async (req, res, next) => {
  try {
    const response = await CommentRepository.createComment(
      CreateOption(req.user.id, req.body)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 댓글 작성하기 실패"));
    }
    return res.status(200).redirect("/post/" + req.body.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdateComment = async (req, res, next) => {
  try {
    const checkAuthor = await CommentRepository.checkMyComment(
      parseInt(req.params.commentId, 10),
      req.user.id
    );
    if (!checkAuthor[0]) {
      return res
        .status(401)
        .send(resFormat.fail(401, "댓글 수정 권한이 없습니다."));
    }
    const response = await CommentRepository.updateComment(
      UpdateOption(parseInt(req.params.commentId, 10), req.body)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 수정 실패"));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, "댓글 수정 성공", response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const DeleteComment = async (req, res, next) => {
  try {
    const checkAuthor = await CommentRepository.checkMyComment(
      parseInt(req.params.commentId, 10),
      req.user.id
    );
    if (!checkAuthor[0]) {
      return res
        .status(401)
        .send(resFormat.fail(401, "자신의 댓글만 삭제 가능합니다."));
    }
    const response = await CommentRepository.deleteComment(
      parseInt(req.params.commentId, 10)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 삭제 실패"));
    }
    return res.status(200).redirect("/post/" + req.query.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const GetComment = async (req, res, next) => {
  try {
    const data = await CommentRepository.getCommentById(
      parseInt(req.params.commentId, 10)
    );
    if (!data) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 불러오기 실패"));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, "댓글 정보 제공", data));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const CreateOption = (id, bodydata) => {
  // DB에 맞추어 Option 설정
  const Option = {
    author: {
      connect: {
        id: parseInt(id, 10),
      },
    },
    post: {
      connect: {
        id: parseInt(bodydata.postId, 10),
      },
    },
    content: bodydata.content,
    createdAt: dbNow(),
  };
  return Option;
};

const UpdateOption = (id, bodydata) => {
  // DB에 맞추어 Option 설정
  const Option = {
    id: parseInt(id, 10),
    content: bodydata.content,
    updatedAt: dbNow(),
  };
  return Option;
};
