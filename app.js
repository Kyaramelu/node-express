import bodyParser from "body-parser"
import User from "./models/user.js"
import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors"

mongoose.connect("mongodb://localhost:27017/myapp")
  .then(() => {
    console.log("Successfully connected to database.")
  }).catch((err) => {
    console.log(err)
    console.log("Failed to connect to database.")
  })

let app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(session({
  secret: '87za4dza84d8a4zd5az1zad51daz',
  resave: false,
  saveUninitialized: true
}));

app.post('/register', async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    res.status(200).json({ status: "success", message: "Successfully created user account." })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", message: "We ran into an error." })
  }
});

app.get('/user', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email }).select("-password")

    if (!user) {
      res.status(404).json({ status: "fail", message: "No user matching the email was found." })
      return
    }

    res.status(200).json({ status: "success", user: user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", message: "We ran into an error." })
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ status: "fail", message: "No user matching the email was found." });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ status: "fail", message: "Invalid password." });
      return;
    }

    req.session.user = user;

    res.status(200).json({ status: "success", message: "Successfully logged in.", user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "We ran into an error." });
  }
});

app.listen(47335, () => console.log('Server started on port 3000'));
