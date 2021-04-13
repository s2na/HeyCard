import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo2.svg";

function Navigation_User({user, logout}) {
  // Signin.js -> App.js에서 받아온 사용자 카카오 닉네임 {user}와 App.js에서 선언한 logout함수를 인자로 받아온다.
  const {username} = user || {};
  // Signin.js -> App.js에서 받아온 사용자 카카오 닉네임 {user}를 {username}을 선언하여 {username}에 값을 넣어 관리한다.
  const activeStyle = {
    color: "#A259FF",
  };

  const handleClick = () => {
    logout()
  }

  return (
    // Nav- Start
    <div className="Nav">
      <img src={Logo} alt="로고" className="nav-logo"></img>
      <div className="nav-item">
        <NavLink exact to="/" activeStyle={activeStyle}>
          HOME
        </NavLink>
        <NavLink to="/myspace" activeStyle={activeStyle}>
          MY SPACE
        </NavLink>
        <NavLink exact to="/" onClick={handleClick}>
          LOGOUT
        </NavLink>
          {username}
      </div>
    </div>
    //    Nav-End
  );
}

export default Navigation_User;
