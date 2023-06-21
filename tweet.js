import express from "express";
import { writeFile, readFile } from "fs/promises";

const router = express.Router();

const getTweet = (req) => (tweet) => tweet.id === Number(req.params.id);

const fileSource = "./tweets.json";
const fileEncoding = "utf-8";
const loadDb = async () => {
  try {
    const content = await readFile(fileSource, fileEncoding);
    return JSON.parse(content);
  } catch (error) {
    console.error(error);
  }
};

const persistDb = async () => {
  try {
    await writeFile(fileSource, JSON.stringify(tweets), fileEncoding);
  } catch (error) {
    console.error(error);
  }
};

const tweets = (await loadDb()) || [];
let nextId = tweets[tweets.length - 1]?.id + 1 || 1;

router.post("/", async (req, res) => {
  const newTweet = { id: nextId++, ...req.body };
  tweets.push(newTweet);
  await persistDb();
  const nrId = tweets.length - 1;
  res.redirect("/tweet/" + nrId);
});
router.get("/:id", (req, res) => {
  const tweet = tweets.find(getTweet(req));

  if (!tweet) {
    return res.status(404).send("Tweet not found");
  }
  res.send(tweet);
});
router.get("/", (req, res) => {
  //res.send(tweets);
  res.render("public/index.html");
});
router.patch("/:id", async (req, res) => {
  const index = tweets.findIndex(getTweet(req));
  const updateTweet = { ...tweets[index], ...req.body };
  tweets[index] = updateTweet;
  await persistDb();
  res.send(updateTweet);
});
router.put("/:id", async (req, res) => {
  const index = tweets.findIndex(getTweet(req));
  const updateTweet = req.body;
  tweets[index] = updateTweet;
  await persistDb();
  res.send(updateTweet);
});
router.delete("/:id", async (req, res) => {
  const index = tweets.findIndex(getTweet(req));
  const tweet = tweets[index];
  tweets.splice(index, 1);
  await persistDb();
  res.send(tweet);
});

export default router;
