import * as UserRepository from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import passport from "passport";
import resFormat from "../utils/resFormat.js";

export const SignUp = async (req, res, next) => {
  try {
    const exUserNickname = await UserRepository.findByNickname(
      req.body.nickname
    );
    if (exUserNickname) {
      return res
        .status(403)
        .render(
          "home/signup",
          resFormat.fail(403, "이미 가입된 닉네임입니다.")
        );
    }
    const exUserEmail = await UserRepository.findByEmail(req.body.email);
    if (exUserEmail) {
      return res
        .status(403)
        .render(
          "home/signup",
          resFormat.fail(403, "이미 가입된 이메일입니다.")
        );
    }
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const response = await UserRepository.createLocal(
      req.body.nickname,
      req.body.email,
      hashPassword
    );
    if (!response)
      return res
        .status(500)
        .redirect("home/signup", resFormat.fail(500, "회원가입 실패"));
    return res.status(200).redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const LogIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .render("home/login", resFormat.fail(401, info.message));
    }
    req.login(user, (err) => {
      if (err) {
        //passport login 실행단계
        console.error(err);
        next(err);
      }
      return res.status(200).redirect("/");
    });
  })(req, res, next);
};

export const LogOut = (req, res, next) => {
  req.logOut();
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      res.clearCookie("connect.sid");
      return res.status(200).redirect("/");
    }
  });
};

export const NicknameCheck = async (req, res, next) => {
  try {
    const exUser = await UserRepository.findByNickname(req.body.nickname);
    if (exUser) {
      return res.status(403).send(resFormat.fail(403, "중복된 닉네임입니다"));
    }
    return res
      .status(200)
      .send(resFormat.success(200, "사용가능한 닉네임입니다."));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const EmailCheck = async (req, res, next) => {
  try {
    const exUser = await UserRepository.findByEmail(req.body.email);
    if (exUser) {
      return res.status(403).send(resFormat.fail(403, "중복된 이메일입니다"));
    }
    return res
      .status(200)
      .send(resFormat.success(200, "사용가능한 이메일입니다."));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const GetUser = async (req, res, next) => {
  try {
    const user = await UserRepository.findById(parseInt(req.params.id, 10));
    if (!user) {
      next();
    }
    req.userData = user;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
