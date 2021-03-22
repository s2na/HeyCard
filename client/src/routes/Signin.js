import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo2.svg";

const { Kakao } = window;

function Signin() {
  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      scope: "profile, account_email, gender",
      success: function (authObj) {
        console.log(authObj); //토큰

        Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            const account = res.kakao_account; //사용자 정보
            console.log(account);
          },
        });
      },
    });
  };

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

      <Link to="/signin" className="sign-btn2">
        카카오 계정으로 <u>신규 가입하기</u>
      </Link>
    </div>
  );
}

export default Signin;
