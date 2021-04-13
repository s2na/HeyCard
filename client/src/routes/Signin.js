import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo2.svg";
import { Redirect } from "react-router-dom";

const { Kakao } = window;

function Signin({ authenticated, login, gettoken, location }) {
  // authenticated(state: 로그인 인증), login(function: username state를 App.js로 넘겨줌)
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  // 카카오 로그인 api에서 사용자 정보 중 nickname만 setUsername으로 빼내서 state 관리
  const kakaoLoginClickHandler = () => {
    //카카오 로그인 api
    Kakao.Auth.login({
      scope: "profile, account_email, gender",
      success: function (authObj) {
        //토큰
        setToken(authObj.access_token);
        Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            // res.kakao_account (사용자 정보)
            setUsername(res.kakao_account.profile.nickname);
          }, // Kakao.API.request.success - end
        }); // Kakao.API.request - end
      }, // Kakao.Auth.login.success - end
    }); // Kakao.Auth.login - end
  }; // kakaoLoginClickHandler - end (카카오 로그인 api - end)
  useEffect(() => {
    //username state의 값이 변하게 되면 login({username})을 실행
    return () => login({ username });
  }, [username]);

  useEffect(() => {
    //token state의 값이 변하게 되면 gettoken({token})을 실행
    return () => gettoken({ token });
  }, [token]);

  // authenticated(boolean: 사용자 로그인 여부)의 값이 true일이면 "/"위치(Home,js)로 이동
  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <div className="Main-sign">
      <div className="sign-logo">
        <img src={Logo} alt="로고" width="300px" height="200px" />
      </div>

      <div className="sign-text">
        <p> 지금 회원가입하시면 </p>
        <p> 명함이 5초만에 뚝딱!</p>
      </div>
      <button className="sign-btn" onClick={kakaoLoginClickHandler}>
        {" "}
      </button>
      <Link to="/signin" className="sign-btn2">
        카카오 계정으로 <u>신규 가입하기</u>
      </Link>
    </div>
  );
}

export default Signin;
