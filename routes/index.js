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

router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("rouet index");
});

module.exports = router;