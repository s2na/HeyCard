const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const axios = require('axios');
const express = require('express');
const { route } = require('..');
const router = express.Router();

router.use(passport.initialize())
router.use(passport.session())
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

passport.use(new KakaoStrategy({
  clientID : "3ca00bbe766f69f0e2b3f1eb02ef1da3",
  clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
  callbackURL : "http://localhost:3001/api/auth/kakao"
},
(accessToken, refreshToken, profile, done) => {
  // authorization 에 성공했을때의 액션
  console.log(`id : ${profile.id}`)
  //console.log(`nickname : ${profile.nickname}`)
  console.log(`accessToken : ${accessToken}`)
  //console.log(`사용자 profile: ${JSON.stringify(profile._json)}`)
  let user = {
      profile: profile._json,
      accessToken: accessToken
  }
  return done(null, user)
}
))

passport.serializeUser(function (user, done) {
//console.log(`user : ${user.profile.id}`)
done(null, user)
})
passport.deserializeUser(function (obj, done) {
console.log(`obj : ${obj}`)
done(null, obj)
})

router.get('/', passport.authenticate('kakao'), function (req, res) {
// 로그인 시작시 state 값을 받을 수 있음
res.send(`accessToken : ${req.user.accessToken}`)
//res.redirect('http://localhost:3000')
//res.send(`id : ${req.user.profile.id} / accessToken : ${req.user.accessToken}`)
//res.redirect('http:localhost:3000');
//axios.post('https://localhost:3000/signin')
//console.log(req.user.accessToken);
/*app.use(
  cors({
  origin: 'http://localhost:3000',
  credentials: true,
  })
  );*/
})


module.exports = router;