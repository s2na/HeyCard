import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Main">
      <div className="main-text">
        <p>지금 바로 </p>
        <p>당신만의 명함을 만들어보세요!</p>
      </div>
      <Link to="/signin" className="main-btn">
        GET STARTED!
      </Link>
    </div>
  );
}

export default Home;
