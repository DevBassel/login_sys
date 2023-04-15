const express = require("express");
const router = express.Router();
const {
  dashbord,
  login_post,
  login_get,
  singup_post,
  singup_get,
} = require("../controller/authControll");
const authUser = require("./auth");

router.route("/dashbord").get(authUser,dashbord);
router.route("/login").post(login_post).get(login_get);
router.route("/singup").post(singup_post).get(singup_get);

module.exports = router;
