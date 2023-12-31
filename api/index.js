const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Jokes = require("./models/Jokes");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
const bodyParser = require("body-parser");

const password = process.env.PASSWORD;

const salt = bcrypt.genSaltSync(10);
const secret = "secret";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  `mongodb+srv://blog:${password}@blog.fz13thm.mongodb.net/?retryWrites=true&w=majority`
);

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
    });
    res.json(userDoc);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: err });
  }
});
app.get("/jokes", async (req, res) => {
  try {
    const jokeDoc = await Jokes.find();
    res.json(jokeDoc);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: err });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    res.status(401).json({ message: "Wrong username or password" });
    return;
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, userId: userDoc._id }, secret, (err, token) => {
      if (err) {
        res.status(500).json({ message: "Error signing token" });
      } else {
        res.cookie("token", token).json({ id: userDoc._id, username });
      }
    });
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
});

app.post("/create",upload.none(), async (req, res) => {
  const { title, content, username } = req.body;
  console.log("this is req.body",JSON.stringify(req.body));
  // console.log("this is req.body"+req.body.title);
  // console.log("this is req.body"+req.body.content);

  try {
    const jokeDoc = await Jokes.create({
      title,
      content,
      username,
    });
    console.log(req.body);
    console.log(jokeDoc);
    res.json(jokeDoc);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: err });
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, secret, (err, info) => {
    if (err) {
      res.status(401).json({ message: "You are not logged in" });
    } else {
      res.json(info);
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "You are logged out" });
});

app.delete("/jokes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jokeDoc = await Jokes.findByIdAndDelete(id);
    res.json(jokeDoc);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: err });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
