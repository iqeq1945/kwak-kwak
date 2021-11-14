import local from "./localStrategy.js";
import * as UserRepository from "../../repositories/UserRepository.js";

export default (passport) => {
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    //DB접근
    try {
      const finduser = await UserRepository.findById(user.id);
      done(null, finduser);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  local(passport);
};
