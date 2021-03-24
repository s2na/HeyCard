const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(cors());
//router.use(passport.initialize())
//router.use(passport.session())
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json
router.get('/', (req, res) => { /// 주소의 요청일 때 실행된다.
    
});

router.post('/', (req, res) => {    //POST 메서드 / data 주소의 요청일 때만 실행된다.
    if(!req.secure){
        res.header("Access-Control-Allow-Origin", "*");
        console.log(req.body.authObj.access_token);
        res.redirect("http://localhost:3000/#/")
    }else{
        next();
    }
});

router.use('/', (req, res) => {     //POST 메서드 / data 주소의 요청일 때만 실행된다.
    
});

module.exports = router;