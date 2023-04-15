const User = require("../models/User");
const bcrypt = require("bcrypt");
const singError = require("../errors/authError");

const jwt = require("jsonwebtoken");
function dashbord(req, res) {
  try {
    if (req.user) {
      console.log(req.user);
      res.status(200).json(req.user);
    }
  } catch (error) {
    res.status(401).json("dont have an accsses");
  }
}
async function login_post(req, res) {
  const { email, password } = req.body;
  try {
    // find user
    const user = await User.findOne({ email });

    // check user
    if (!user) return res.status(404).json({ msg: "not found user!" });

    // check password
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) return res.status(401).json({ msg: "wrong data" });

    // set token
    const token = jwt.sign(
      { id: user.id, email: user.email, password: user.password },
      process.env.SECRET
    );
    // send token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

async function singup_post(req, res) {
  const { email, password } = req.body;
  try {
    // create user in DB
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    
    res.status(500).json(singError(error));
  }
}
function login_get(req, res) {
  res.status(200).json({ msg: "login" });
}
function singup_get(req, res) {
  res.json({ msg: "singup" });
}
module.exports = {
  dashbord,
  login_post,
  login_get,
  singup_get,
  singup_post,
};
