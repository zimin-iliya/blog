const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const password = process.env.PASSWORD;

const salt = bcrypt.genSaltSync(10);
const secret = "secret";

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
        res.cookie("token", token).json({id: userDoc._id, username});
      }
    });
  } else {
    res.status(401).json({ message: "You are not logged in" });
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

app.listen(4000, () => console.log("Server running on port 4000"));
