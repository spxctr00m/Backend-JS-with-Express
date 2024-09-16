const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing!");
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error("Unable to login, invalid credentials");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

module.exports = auth;
