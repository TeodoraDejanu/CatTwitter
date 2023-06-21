import express from "express";
import tweet from "./tweet.js";
import tweetDb from "./tweetDb.js";
import mongoose from "mongoose";
import Tweet from "./models/Tweet.js";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;
const MONGO_URI =
  "mongodb+srv://teodoradejanu:teo@cluster0.axnegl0.mongodb.net/tweet";

app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/data", async (req, res) => {
  Tweet.find()
    .sort({ _id: -1 })
    .limit(3)
    .then((data) => {
      res.send(data);
    });
});

app.get("/createTweet", async (req, res) => {
  res.render("tweet");
});

app.get("/sortb", async (req, res) => {
  try {
    Tweet.find({ category: "british" }).then((data) => {
      res.render("sortTweet", { record: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});
app.get("/sorts", async (req, res) => {
  try {
    Tweet.find({ category: "siamese" }).then((data) => {
      res.render("sortTweet", { record: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

app.get("/sortp", async (req, res) => {
  try {
    Tweet.find({ category: "persian" }).then((data) => {
      res.render("sortTweet", { record: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

app.get("/sortx", async (req, res) => {
  try {
    Tweet.find({ category: "sphynx" }).then((data) => {
      res.render("sortTweet", { record: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

app.use("/tweet-files", tweet);
app.use("/tweets", tweetDb);

app.listen(port, () => {
  console.log("Hello!", port);
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));
});
