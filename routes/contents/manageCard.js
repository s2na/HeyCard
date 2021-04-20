//=================================
// manageCard.js
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
        console.log("color : " + req.body.color);
        console.log("name : " + req.body.name);
        console.log("mail : " + req.body.mail);
        console.log("corporate : " + req.body.corporate);
        console.log("position : " + req.body.position);
        console.log("phonenumber : " + req.body.phonenumber);
        console.log("officenumber : " + req.body.officenumber);
        console.log("address : " + req.body.address);
        console.log("introduce : " + req.body.introduce);
        console.log("image : " + req.body.image);
        console.log("\n");
        let sql = `INSERT INTO contents (
                        color
                        , name
                        , mail
                        , corporate
                        , position
                        , phonenumber
                        , officenumber
                        , address
                        , image
                        , introduce
                        , lastUpdateDate
                    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());`   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        let params = [
            req.body.color
            , req.body.name
            , req.body.mail
            , req.body.corporate
            , req.body.position
            , req.body.phonenumber
            , req.body.officenumber
            , req.body.address
            , req.body.image
            , req.body.introduce
        ]
        mysqlCon.query(sql, params, function(err) {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            //else res.redirect('/list');
        });
    }
});

router.get('/select', (req, res) => {
    if(!req.secure){
        res.json(returnCnt);
    }
});

let returnCnt = 0;
router.get('/titleCheck', (req, res) => {
    if(!req.secure){
        //res.json(returnCnt);
    }
});

router.post('/titleCheck', (req, res) => {
    if(!req.secure){
        let sql = `SELECT COUNT(1) AS cnt FROM contents WHERE userEmail = ?;`   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        let params = [req.body.title]
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