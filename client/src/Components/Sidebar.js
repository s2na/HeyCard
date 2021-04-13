import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const LeftbarPositioner = styled.div`
  width: 7rem;
  height: 100vh;
`;

const LeftbarHeader = styled.div`
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: solid black;
  margin-top: 1rem;
  color: #a259ff;
`;

const LeftbarBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 1rem;
  border-style: solid;
`;

const activeStyle = {
  background: "#DBBEFF",
  borderRadius: "7px",
};

function Sidebar() {
  return (
    <LeftbarPositioner>
      <LeftbarHeader>MY SPACE</LeftbarHeader>
      <LeftbarBody>
        <NavLink
          exact
          to="/myspace"
          activeStyle={activeStyle}
          className="Sidebaritem"
        >
          명함만들기
        </NavLink>
        <NavLink
          to="/myspace/repository"
          activeStyle={activeStyle}
          className="Sidebaritem"
        >
          명함보관함
        </NavLink>
      </LeftbarBody>
    </LeftbarPositioner>
  );
}

export default Sidebar;
