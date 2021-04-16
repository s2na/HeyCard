//=================================
//   	dbInfo.js
// server mysql 접속정보
// https://junspapa-itdev.tistory.com/10 -> 다중쿼리 처리방법, sql에 파라미터 매핑방법
// https://lts0606.tistory.com/109 -> Nodejs에서 Mybatis 사용하기
//=================================
var mysql = require('mysql');

var db_info = {
    host: 'us-cdbr-east-03.cleardb.com',          // 사용할 DB가 설치된 호스트의 IP
    user: 'b57b813ec96f75',               // DB의 user 이름
    password: '3ea5ba65',      // DB를 설치할 때 사용자가 지정한 비밀번호
    database: 'heroku_a6d2ea31e650b20'         // 사용할 데이터베이스의 이름
}
/*
var db_info = {
    host: 'localhost',          // 사용할 DB가 설치된 호스트의 IP
    port: '3306',               // DB를 설치할 때 사용자가 지정한 포트번호. 따로 지정해주지 않았다면 기본값은 3306
    user: 'root',               // DB의 user 이름
    password: 'qkrwns123',      // DB를 설치할 때 사용자가 지정한 비밀번호
    database: 'heycard'         // 사용할 데이터베이스의 이름
}
*/
module.exports = {
    init: function () {     // DB와 서버간의 연결 객체를 반환하는 'init()' 함수
        return mysql.createConnection(db_info);     // 'createConnection()'에는 DB에 대한 정보(db_info)를 매개변수로 넣어주어야 한다.
    },
    connect: function(conn) {
        conn.connect(function(err) {        // 실제로 데이터 교환을 위해 연결을 시키는 'connect()' 함수
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}

/*  express 쿼리수행 예제(매개변수 이용하기)
app.get("/item/insert/:name/:category/:color/:description/:numberOfUsage/:size/:status", function(req , res){
        sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var stringRequest = "INSERT INTO dbo.Item (name, category, color, description, numberOfUsage, size, status) VALUES ('"+ req.params.name +"','"+ req.params.category+"','"+ req.params.color+"','"+ req.params.description+"','"+req.params.numberOfUsage+"','"+req.params.size+"','"+req.params.status+"')";
        console.log(stringRequest)
        request.query(stringRequest, function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
            });
        });
    })
*/