import bodyParser from "body-parser"
import User from "./models/user.js"
import mongoose from "mongoose";
import express from "express";
import expressSession from "express-session";
import cors from "cors"
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import MongoStore from "connect-mongo"

const session = expressSession({
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/myapp" }),
  name: "secure",
  cookie: {
    domain: ".caramello.space",
    sameSite: "lax",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    httpOnly: true
  },
  secret: "azdzajdazpjdzajdzapazdazsda",
  saveUninitialized: true,
  resave: true
})

mongoose.connect("mongodb://localhost:27017/myapp")
  .then(() => {
    console.log("Successfully connected to database.")
  }).catch((err) => {
    console.log(err)
    console.log("Failed to connect to database.")
  })


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.set("trust proxy", 1)
app.use(bodyParser.json());
app.use(cors())
app.use(session);

app.post('/register', async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      password: req.body.password
    })

    delete user.password
    res.status(200).json({ status: "success", message: "Successfully created user account.", user: user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", message: "We ran into an error." })
  }
});

app.get('/user', async (req, res) => {
  try {
    const email = req.session.user.email
    const user = User.findOne({ email: email }).select("-password")

    if (!user) {
      res.status(404).json({ status: "fail", message: "No user was found, please login first." })
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


app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: "error", message: "We ran into an error." });
    } else {
      res.status(200).json({ status: "success", message: "Successfully logged out." });
    }
  });
});


app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => console.log('Server started on port 3000'));
