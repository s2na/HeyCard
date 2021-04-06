import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo2.svg";

function Navigation() {
  const activeStyle = {
    color: "#A259FF",
  };

  return (
    // Nav- Start
    <div className="Nav">
      <img src={Logo} alt="로고" className="nav-logo"></img>
      <div className="nav-item">
        <NavLink exact to="/" activeStyle={activeStyle}>
          HOME
        </NavLink>
        <NavLink to="/myspace/create" activeStyle={activeStyle}>
          MY SPACE
        </NavLink>
        <NavLink to="/signin" activeStyle={activeStyle}>
          LOGIN
        </NavLink>
        <NavLink to="/fileupload" activeStyle={activeStyle}>
          FileUpload
        </NavLink>
        <NavLink to="/createcard" activeStyle={activeStyle}>
          CreateCard
        </NavLink>
      </div>
    </div>
    //    Nav-End
  );
}

export default Navigation;
