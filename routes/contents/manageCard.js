//=================================
//   	manageCard.js
// 
//=================================
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const db_config = require('../config/dbInfo.js');
const mysqlCon = db_config.init();

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json

router.post('/create', (req, res) => {
    if(!req.secure){
        res.header("Access-Control-Allow-Origin", "*");
        console.log("name : " + req.body.name);
        console.log("email : " + req.body.email);
        console.log("company : " + req.body.company);
        console.log("position : " + req.body.position);
        console.log("tel : " + req.body.tel);
        console.log("address : " + req.body.address);
        console.log("introduce : " + req.body.introduce);
        console.log("\n");
        var sql = `INSERT INTO contents (
                        name
                        , email
                        , company
                        , position
                        , tel
                        , address
                        , introduce
                        , lastUpdateDate
                    ) VALUES(?, ?, ?, ?, ?, ?, ?, NOW());`   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        var params = [
            , req.body.name
            , req.body.email
            , req.body.company
            , req.body.position
            , req.body.tel
            , req.body.address
            , req.body.introduce
        ]
        mysqlCon.query(sql, params, function(err) {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            //else res.redirect('/list');
        });
    }
});

var returnCnt = 0;
router.get('/titleCheck', (req, res) => {
    if(!req.secure){
        res.json(returnCnt);
    }
});

router.post('/titleCheck', (req, res) => {
    if(!req.secure){
        var sql = `SELECT COUNT(1) AS cnt FROM contents WHERE userEmail = ?;`   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        var params = [req.body.title]
        mysqlCon.query(sql, params, function(err, result) {
            if(err) {
                console.log('query is not excuted. select fail...\n' + err);
            } else{
                returnCnt = result[0].cnt;
                console.log(result[0].cnt);
            }
        });
    }
});

module.exports = router;

/*
INSERT INTO contents (
    userEmail
    , title
    ,name
    , email
) VALUES('0404pj@naver.com', 'test', '박준', '0404pj@naver.com')
*/