import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import path from "path";
import MainController from "./controllers/MainController.js";
const app = express();
const __dirname = path.resolve();

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/src/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/", MainController);

const port = 3000;
app.listen(port, function () {
  console.log("server on! http://localhost:3000");
});
