import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Modal.css";

const Modalrepository = (props) => {
  const { open, close, deleteCard } = props;

  return (
    //모달이 열릴때 openModal클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            명함 삭제하기
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={deleteCard}>
              삭제
            </button>
            {/* 버튼에 삭제하기 api 추가하기 */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modalrepository;