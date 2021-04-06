//=================================
//   	oauth.js
// api 라우팅 역할
//=================================
const console = require('better-console');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use("/auth/kakao", require("./auth/kakao"));
router.use("/auth/oauth", require("./auth/oauth"));
router.use("/user/upload", require("./user/userUploadImage"));  // /api/user/upload 요청 시 처리할 라우터 미들웨어
router.use("/contents/manageCard", require("./contents/manageCard"));
//router.use("/user/createUser", require("./user/createUserAccount"));

router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("rouet index");
});

module.exports = router;