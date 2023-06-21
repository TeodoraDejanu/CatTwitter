import express, { response } from "express";
import Tweet from "./models/Tweet.js";
import multer from "multer";

const router = express.Router();
const uploadPhoto = multer({ dest: "./public/images/" });

let storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({
  storage: storage,
});

const getTweet = (req) => (tweet) => tweet.id === Number(req.params.id);

router.post("/", upload.single("page_Photo"), async (req, res) => {
  const tweetDetails = Tweet.find({});
  try {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const pagePhoto = req.file.filename;
    const tweetData = new Tweet({
      title: title,
      content: content,
      category: category,
      pagePhoto: pagePhoto,
    });
    await tweetData.save();
    tweetDetails.then((data) => {
      res.render("tweets", { record: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    Tweet.find().then((data) => {
      res.render("tweets", { record: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    Tweet.findById({ _id: req.params.id }).then((data) => {
      res.render("editTweet", { element: data });
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/:id", upload.single("page_Photo"), async (req, res) => {
  console.log("redirect");
  try {
    await Tweet.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    });
    console.log("title:", req.body);
    res.redirect("/tweets");
  } catch (err) {
    res.status(401).send(err);
    console.log("error", err);
  }
});
router.delete("/:id", async (req, res) => {
  await Tweet.deleteOne({ _id: req.params.id });
  res.redirect("/tweets");
});

export default router;
