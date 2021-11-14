import passportLocal from "passport-local";
import * as UserRepository from "../../repositories/UserRepository.js";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          console.log("이메일 확인");
          const user = await UserRepository.findByEmail(email);
          if (!user) {
            return done(null, false, {
              message: "이메일에 해당하는 유저 없음",
            });
          }
          console.log("비밀번호 확인");
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, {
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
          const FullUser = await UserRepository.findById(user.id);
          return done(null, FullUser); // 성공
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
