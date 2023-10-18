import bodyParser from "body-parser"
import User from "./models/user.js"
import mongoose from "mongoose";
import express from "express";

mongoose.connect("mongodb://localhost:27017/myapp")
  .then(() => {
    console.log("Successfully connected to database.")
  }).catch((err) => {
    console.log(err)
    console.log("Failed to connect to database.")
  })

let app = express();
app.use(bodyParser.json());

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

app.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(404).json({ status: "fail", message: "No user matching the email was found." })
      return
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", message: "We ran into an error." })
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
