import express from "express";
import session from "express-session";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import methodOverride from "method-override";
import passport from "passport";
import passportConfig from "./configs/passport/index.js";
import MainController from "./controllers/MainController.js";
import UserController from "./controllers/UserController.js";
import ProfileController from "./controllers/ProfileController.js";
const app = express();
const __dirname = path.resolve();

passportConfig(passport);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  // development
  app.use(morgan("dev"));
}

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/src/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// router
app.use("/", MainController);
app.use("/user", UserController);
app.use("/profile", ProfileController);

const port = 3000;
app.listen(port, function () {
  console.log("server on! http://localhost:3000");
});
