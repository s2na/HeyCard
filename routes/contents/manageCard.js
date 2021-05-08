//=================================
// manageCard.js
// 회원 명함 관리 역할
//=================================
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const db_config = require('../config/dbInfo.js');
const mysqlCon = db_config.init();

db_config.connect(mysqlCon);

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json

//모달에서 명함 POST (명함만들기) -> /api/contents/manageCard/insert
router.post('/insert', (req, res) => {
    if(!req.secure){
        const mysqlCon = db_config.init();
        db_config.connect(mysqlCon);

        res.header("Access-Control-Allow-Origin", "*");
        console.log("title : " + req.body.title);
        console.log("userEmail : " + req.body.userEmail);
        console.log("color : " + req.body.color);
        console.log("name : " + req.body.name);
        console.log("mail : " + req.body.mail);
        console.log("corporate : " + req.body.corporate);
        console.log("position : " + req.body.position);
        console.log("phonenumber : " + req.body.phonenumber);
        console.log("officenumber : " + req.body.officenumber);
        console.log("address : " + req.body.address);
        console.log("introduce : " + req.body.introduce);
        console.log("image : " + req.body.img);
        console.log("\n");
        let sql = `INSERT INTO contents (
                        title
                        , userEmail
                        , color
                        , name
                        , mail
                        , corporate
                        , position
                        , phonenumber
                        , officenumber
                        , address
                        , introduce
                        , image
                        , lastUpdateDate
                    ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());`   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        let params = [
            req.body.title
            , req.body.userEmail
            , req.body.color
            , req.body.name
            , req.body.mail
            , req.body.corporate
            , req.body.position
            , req.body.phonenumber
            , req.body.officenumber
            , req.body.address
            , req.body.introduce
            , req.body.img
        ]
        mysqlCon.query(sql, params, function(err) {
            if(err) {
                console.log('query is not excuted. insert fail...\n' + err);
                resultToJson = JSON.stringify('N');
                console.log(resultToJson);
                res.send(resultToJson);
            } else{
                resultToJson = JSON.stringify('Y');
                console.log(resultToJson);
                res.send(resultToJson);
            }
        });
    }
});

//사용자 명함 불러오기(명함보관함)  -> /api/contents/manageCard/select
router.post('/select', (req, res) => {
    if(!req.secure){
        const mysqlCon = db_config.init();
        db_config.connect(mysqlCon);
        console.log("select token : " + req.body.token);
        console.log("select userEmail : " + req.body.userEmail);

        res.header("Access-Control-Allow-Origin", "*");
        let sql = `SELECT * FROM contents WHERE userEmail = ?;`
        let params = [
            req.body.userEmail
        ]
        mysqlCon.query(sql, params, function(err) {
            if(err) {
                console.log('query is not excuted. select fail...\n' + err);
                resultToJson = JSON.stringify('N');
                console.log(resultToJson);
                res.send(resultToJson);
            } else{
                resultToJson = JSON.stringify(result);
                console.log(resultToJson);
                res.send(resultToJson);
                //res.send(result[0]);
            }
        });
    }
});
/*
router.post('/select', (req, res) => {
    if(!req.secure){
        const mysqlCon = db_config.init();
        db_config.connect(mysqlCon);

        res.header("Access-Control-Allow-Origin", "*");
        let sql = `SELECT * FROM contents;`
        mysqlCon.query(sql, function(err, result) {
            if(err) {
                console.log('query is not excuted. select fail...\n' + err);
                resultToJson = JSON.stringify('N');
                console.log(resultToJson);
                res.send(resultToJson);
            } else{
                resultToJson = JSON.stringify(result);
                console.log(resultToJson);
                res.send(resultToJson);
                //res.send(result[0]);
            }
        });
    }
});
*/

/*
function getContents(){
    return fetch('/api/contents/manageCard/select', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '박준',
    })
  })
  .then(res => res.json())
  .then(response => {
    //console.log('Success:', JSON.stringify(response))
    return JSON.stringify(response);

  })
  }
  getContents().then(response => console.log(JSON.parse(response)));
  getContents().then(response => console.log(JSON.parse(response)[0]));
  getContents().then(response => console.log(JSON.parse(response)[0].mail));


*/

//명함 수정하기(명함보관함) -> /api/contents/manageCard/update
router.post('/update', (req, res) => {
    if(!req.secure){
        const mysqlCon = db_config.init();
        db_config.connect(mysqlCon);

        res.header("Access-Control-Allow-Origin", "*");
        console.log("update title : " + req.body.title);
        console.log("update userEmail : " + req.body.userEmail);
        console.log("\n");

        let sql =   `UPDATE contents
                        SET title = ?
                            , userEmail = ?
                            , color = ?
                            , name = ?
                            , mail = ?
                            , corporate = ?
                            , position = ?
                            , phonenumber = ?
                            , officenumber = ?
                            , address = ?
                            , image = ?
                            , introduce = ?
                            , lastUpdateDate = NOW()
                        WHERE userEmail = ?
                        AND title = ? ;`   // INSERT 하기전에 이미 있는지 확인하는 기능 추가예정
        let params = [
            req.body.title
            , req.body.userEmail
            , req.body.color
            , req.body.name
            , req.body.mail
            , req.body.corporate
            , req.body.position
            , req.body.phonenumber
            , req.body.officenumber
            , req.body.address
            , req.body.introduce
            , req.body.img
            , req.body.userEmail
            , req.body.title
        ]
        mysqlCon.query(sql, params, function(err) {
            if(err) {
                console.log('query is not excuted. update fail...\n' + err);
                resultToJson = JSON.stringify('N');
                console.log(resultToJson);
                res.send(resultToJson);
            } else{
                resultToJson = JSON.stringify('Y');
                console.log(resultToJson);
                res.send(resultToJson);
            }
        });
    }
});

//명함 삭제하기(명함보관함) -> /api/contents/manageCard/delete
router.post('/delete', (req, res) => {
    if(!req.secure){
        const mysqlCon = db_config.init();
        db_config.connect(mysqlCon);

        res.header("Access-Control-Allow-Origin", "*");
        console.log(" delete title : " + req.body.title);
        console.log(" delete userEmail : " + req.body.userEmail);

        let sql = `DELETE FROM contents WHERE title = ? AND userEmail = ?;`
        let params = [req.body.title, req.body.userEmail]
        mysqlCon.query(sql, params, function(err, result) {
            if(err) {
                console.log('query is not excuted. delete fail...\n' + err);
                resultToJson = JSON.stringify('N');
                console.log(resultToJson);
                res.send(resultToJson);
            } else{
                resultToJson = JSON.stringify('Y');
                console.log(resultToJson);
                res.send(resultToJson);
            }
        });
    }
});

//명함 제목 중복 체크(명함만들기) -> /api/contents/manageCard/titleCheck
router.post('/titleCheck', (req, res) => {
    if(!req.secure){
        const mysqlCon = db_config.init();
        db_config.connect(mysqlCon);

        let sql = `SELECT COUNT(1) AS cnt FROM contents WHERE userEmail = ? AND title = ?;`   
        let params = [req.body.email, req.body.title]
        mysqlCon.query(sql, params, function(err, result) {
            if(err) {
                console.log('query is not excuted. select fail...\n' + err);
                resultToJson = JSON.stringify('N');
                console.log(resultToJson);
                res.send(resultToJson);
            } else{
                resultToJson = JSON.stringify(result[0].cnt);
                console.log(resultToJson);
                res.send(resultToJson);
            }
        });
    }
});

module.exports = router;