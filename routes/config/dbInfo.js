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

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_info); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();