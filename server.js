const express = require('express'); // express 모듈 불러오기
const app = express();  // express 객체 생성
const path = require('path');   // path 모듈 불러오기
const cors = require('cors');
const port = process.env.PORT || 3001;  // 기본 포트를 app 객체에 설정

app.use(cors());
app.use("/api", require("./routes"));
app.use('/api/data', function(req, res) {   // 미들웨어 함수를 특정 경로에 등록
    res.json({ greeting: 'Hello World' });
});

app.use(express.static(path.join(__dirname, './client/build')));  // 리액트 정적 파일 제공    (client폴더에서 npm run build)

app.get('*', (req, res) => {    // 라우트 설정
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});



//app.get('/', (req, res) => res.send('Hello World'))


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})