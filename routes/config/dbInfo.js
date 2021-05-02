//=================================
//   	dbInfo.js
// server mysql 접속정보
// https://junspapa-itdev.tistory.com/10 -> 다중쿼리 처리방법, sql에 파라미터 매핑방법
// https://lts0606.tistory.com/109 -> Nodejs에서 Mybatis 사용하기
//=================================

let mysql = require('mysql');

let db_info = {
    host: 'us-cdbr-east-03.cleardb.com',          // 사용할 DB가 설치된 호스트의 IP
    user: 'b57b813ec96f75',               // DB의 user 이름
    password: '3ea5ba65',      // DB를 설치할 때 사용자가 지정한 비밀번호
    database: 'heroku_a6d2ea31e650b20'         // 사용할 데이터베이스의 이름
}

module.exports = {
    init: function () {     // DB와 서버간의 연결 객체를 반환하는 'init()' 함수
        return mysql.createConnection(db_info);     // 'createConnection()'에는 DB에 대한 정보(db_info)를 매개변수로 넣어주어야 한다.
    },
    connect: function(conn) {
        conn.connect(function(err) {            
            if(err) {                            
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000); 
            }                                   
            });                                 
                                                    
        conn.on('error', function(err) {
        console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
                return conn.connect();                      
            } else {                                    
                throw err;                              
            }
        });
    }
}