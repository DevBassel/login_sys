const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function authUser(req, res, next) {
  // get token from clinte
  const token = req.headers.authorization.split(" ")[1];
  // check token
  if (!token) return res.status(403).json("not found token");
  try {
    // decoded token
    const { email, password } = jwt.verify(token, process.env.SECRET);
    // find user
    const user = await User.findOne({ email });

    // check password
    const isPass = await !bcrypt.compare(password, user.password);
    if (isPass) return res.status(401).json({ msg: "email or password errr" });

    // loggedin
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

module.exports = authUser;
