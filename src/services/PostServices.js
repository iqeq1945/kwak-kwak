import * as PostRepository from "../repositories/PostRepository.js";
import * as LikeRepository from "../repositories/LikeRepository.js";
import * as ScrapRepository from "../repositories/ScrapRepository.js";
import { dbNow } from "../utils/dayUtils.js";
import resFormat from "../utils/resFormat.js";
export const CreatePost = async (req, res, next) => {
  try {
    const response = await PostRepository.createPost(
      CreateOption(req.user.id, req.body)
    );
    if (!response) {
      return res
        .status(500)
        .render(
          "home/write",
          resFormat.fail(500, "알수 없는 에러로 포스트 작성하기 실패")
        );
    }
    return res.status(200).redirect("/community");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdatePost = async (req, res, next) => {
  try {
    const checkAuthor = await PostRepository.checkMyPost(
      parseInt(req.params.postId, 10),
      req.user.id
    );
    if (!checkAuthor[0]) {
      return res
        .status(401)
        .send(resFormat.fail(401, "자신의 포스트만 수정이 가능합니다."));
    }
    const response = await PostRepository.updatePost(
      parseInt(req.params.postId, 10),
      UpdateOption(req.body)
    );
    if (!response) {
      return res
        .status(500)
        .render(
          "home/write",
          resFormat.fail(500, "알수 없는 에러로 포스트 수정하기 실패")
        );
    }
    return res.status(200).redirect("/post/" + req.params.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const DeletePost = async (req, res, next) => {
  try {
    const checkAuthor = await PostRepository.checkMyPost(
      parseInt(req.params.postId),
      req.user.id
    );
    if (!checkAuthor[0]) {
      return res
        .status(401)
        .send(resFormat.fail(401, "포스트 삭제 권한이 없습니다."));
    }
    const response = await PostRepository.deletePost(
      parseInt(req.params.postId)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 삭제 실패"));
    }
    return res.status(200).redirect("/community");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const UpdatePostInfo = async (req, res, next) => {
  try {
    const data = await PostRepository.findById(parseInt(req.params.postId, 10));
    if (!data) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 포스트 정보 찾기 실패"));
    }
    return res.status(200).render("home/rewrite", { post: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const GetPostInfo = async (req, res, next) => {
  try {
    const data = await PostRepository.findById(parseInt(req.params.postId, 10));
    if (!data) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 포스트 정보 찾기 실패"));
    }
    return res.status(200).render("home/view", { post: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const OnLike = async (req, res, next) => {
  try {
    const check = await LikeRepository.findLike(
      req.user.id,
      parseInt(req.params.postId, 10)
    );
    if (check) {
      return res
        .status(401)
        .send(resFormat.fail(401, "이미 좋아요한 글입니다."));
    }
    const response = await LikeRepository.Like(
      req.user.id,
      parseInt(req.params.postId, 10)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 좋아요 실패"));
    }
    return res.status(200).redirect("/post/" + req.params.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const OnUnLike = async (req, res, next) => {
  try {
    const check = await LikeRepository.findLike(
      req.user.id,
      parseInt(req.body.postId, 10)
    );
    if (!check) {
      return res
        .status(401)
        .send(resFormat.fail(401, "좋아요를 한 글이 아닙니다."));
    }
    const response = await LikeRepository.UnLike(
      req.user.id,
      parseInt(req.body.postId, 10)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 좋아요 취소 실패"));
    }
    return res.status(200).send(resFormat.success(200, "좋아요 취소 성공"));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const OnScrap = async (req, res, next) => {
  try {
    const check = await ScrapRepository.findScrap(
      req.user.id,
      parseInt(req.params.postId, 10)
    );
    if (check) {
      return res
        .status(401)
        .send(resFormat.fail(401, "이미 스크랩한 글입니다."));
    }
    const response = await ScrapRepository.OnScrap(
      req.user.id,
      parseInt(req.params.postId, 10)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 스크랩 실패"));
    }
    return res.status(200).redirect("/post/" + req.params.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const OnUnScrap = async (req, res, next) => {
  try {
    const check = await ScrapRepository.findScrap(
      req.user.id,
      parseInt(req.body.postId, 10)
    );
    if (!check) {
      return res
        .status(401)
        .send(resFormat.fail(401, "스크랩한 글이 아닙니다."));
    }
    const response = await ScrapRepository.OnUnScrap(
      req.user.id,
      parseInt(req.body.postId, 10)
    );
    if (!response) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 스크랩 취소 실패"));
    }
    return res.status(200).send(resFormat.success(200, "스크랩 취소 성공"));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const GetPostList = async (req, res, next) => {
  try {
    const keyword = req.query.keyword ? req.query.keyword : undefined;
    const category = req.query.category ? req.query.category : undefined;
    const data = await PostRepository.GetPostList(keyword, category);
    if (!data) {
      return res
        .status(500)
        .send(resFormat.fail(500, "알수 없는 에러로 가져오기 실패"));
    }
    return res.status(200).render("home/community", data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const CreateOption = (id, bodydata) => {
  // DB에 맞추어 Option 설정
  let Option = {
    author: {
      connect: {
        id,
      },
    },
    title: bodydata.title,
    category: bodydata.category,
    content: bodydata.content,
    reservation: bodydata.reservation,
    createdAt: dbNow(),
  };
  if (bodydata.tag) {
    if (Array.isArray(bodydata.tag)) {
      Option.tag = bodydata.tag.join(",");
    } else {
      Option.tag = bodydata.tag;
    }
  }
  return Option;
};

const UpdateOption = (bodydata) => {
  // DB에 맞추어 Option 설정
  let Option = {
    updatedAt: dbNow(),
  };
  if (bodydata.title) {
    Option.title = bodydata.title;
  }
  if (bodydata.content) {
    Option.content = bodydata.content;
  }
  if (bodydata.category) {
    Option.category = bodydata.category;
  }
  if (bodydata.tag) {
    if (Array.isArray(bodydata.tag)) {
      Option.tag = bodydata.tag.join(",");
    } else {
      Option.tag = bodydata.tag;
    }
  }
  return Option;
};
