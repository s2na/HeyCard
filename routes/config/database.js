var mysql = require('mysql');
var db_info = {
    host: 'localhost',          // 사용할 DB가 설치된 호스트의 IP
    port: '3306',               // DB를 설치할 때 사용자가 지정한 포트번호. 따로 지정해주지 않았다면 기본값은 3306
    user: 'root',               // DB의 user 이름
    password: 'qkrwns123',      // DB를 설치할 때 사용자가 지정한 비밀번호
    database: 'heycard'         // 사용할 데이터베이스의 이름
}

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