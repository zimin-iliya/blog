const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
// const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://blog:6R3RwvLLrxVO5gXP@blog.fz13thm.mongodb.net/?retryWrites=true&w=majority"
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
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    res.json({ message: "You are logged in" });
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));

// mongodb+srv://zimin:VLEvS8wtNNERiGPM@blog.sar4uyz.mongodb.net/?retryWrites=true&w=majority
