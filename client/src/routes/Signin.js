import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo2.svg";

const { Kakao } = window;

function Signin() {
  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      scope: "profile, account_email, gender",
      success: function (authObj) {
        fetch('/api/auth/oauth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({authObj})
        })
        .then(response => console.log(JSON.stringify(authObj)));
      
        Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            const account = res.kakao_account; //사용자 정보
            console.log(account);
            var accessToken = Kakao.Auth.getAccessToken();
            Kakao.Auth.setAccessToken(accessToken);
            console.log(JSON.stringify(authObj));
          },
          fail : function(error) {
            console.log('카카오톡 사용자 정보 가져오기 실패!');
          }
        });
      },
      fail : function(error) {
        console.log('카카오톡 로그인 연결 실패!');
      }
  });
}

  const kakaoLogoutClickHandler = () => {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(response) {
        console.log(response);
      },
      fail: function(error) {
        console.log(error);
      },
    });
  }

  return (
    <div className="Main-sign">
      <div className="sign-logo">
        <img src={Logo} alt="로고" width="300px" height="200px" />
      </div>

      <div className="sign-text">
        <p> 지금 회원가입하시면 </p>
        <p> 명함이 5초만에 뚝딱!</p>
      </div>
      <button className="sign-btn" onClick={kakaoLoginClickHandler}></button>
      
      <Link to="/signin" className="sign-btn2" onClick={kakaoLogoutClickHandler}>
        카카오 계정으로 <u>신규 가입하기</u>
      </Link>
    </div>
  );
}

export default Signin;
