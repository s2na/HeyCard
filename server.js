//=================================
// server.js
// express 구동역할
// React + Node.js 서버 합치기(https://online.codingapple.com/unit/nodejs-react-integration/?id=2305)
//=================================

const express = require('express'); // express 모듈 불러오기
const app = express();  // express 객체 생성
const path = require('path');   // path 모듈 불러오기
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 80;  // 기본 포트를 app 객체에 설정

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
app.use("/api", require("./routes"));
app.use('/api/data', function(req, res) {   // 미들웨어 함수를 특정 경로에 등록
  res.json({ greeting: 'Hello World' });
});

/*
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
*/
app.use(express.static(path.join(__dirname, './client/build')));  // 리액트 정적 파일 제공    (client폴더에서 npm run build)

/*
app.get('*', (req, res) => {    // 라우트 설정
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
*/


app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})