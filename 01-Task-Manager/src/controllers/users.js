const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  res.json({ msg: "Welcome here boss" });
};

// register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send({ error });
  }
};

// login a new user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login, User not found!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login, Invalid password");
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY
    );
    res.send({ user, token, message: "Logged in successfully!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getUsers, registerUser, loginUser };
