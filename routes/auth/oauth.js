//=================================
// oauth.js
// 로그인, 로그아웃 역할
//=================================
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const axios = require('axios');
const express = require('express');
const router = express.Router();
const db_config = require('../config/dbInfo.js');
const mysqlCon = db_config.init();

db_config.connect(mysqlCon);

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

router.post('/login', (req, res) => {    //POST 메서드 / data 주소의 요청일 때만 실행된다.
    if(!req.secure){
        res.header("Access-Control-Allow-Origin", "*");
        console.log("accessToken : " + req.body.token);     //accessToken : 12시간, refreshToken : 1주
        //console.log("refreshToken : " + req.body.refresh);     //accessToken : 12시간, refreshToken : 1주
        console.log("email : " + req.body.email);     //accessToken : 12시간, refreshToken : 1주

        var sql = "INSERT INTO login VALUES(?, ?, ?, NOW())";   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        var params = [req.body.token, 'temp', req.body.email];
        //var params = [req.body.authObj.access_token, req.body.authObj.refresh_token]
        mysqlCon.query(sql, params, function(err) {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            //else res.redirect('/list');
        });
    }else{
        next();
    }
});

router.post('/logout', (req, res) => {    //POST 메서드 / data 주소의 요청일 때만 실행된다.
    if(!req.secure){
        res.header("Access-Control-Allow-Origin", "*");
        console.log("accessToken : " + req.body.token);     //accessToken : 12시간, refreshToken : 1주
        //console.log("refreshToken : " + req.body.refresh);     //accessToken : 12시간, refreshToken : 1주
        //console.log("email : " + req.body.email);     //accessToken : 12시간, refreshToken : 1주

        var sql = "DELETE FROM login WHERE accessToken = ?";   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        var params = [req.body.token];
        //var params = [req.body.authObj.access_token, req.body.authObj.refresh_token]
        mysqlCon.query(sql, params, function(err) {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            //else res.redirect('/list');
        });
    }else{
        next();
    }
});

router.use('/', (req, res) => {     //POST 메서드 / data 주소의 요청일 때만 실행된다.
    
});

module.exports = router;