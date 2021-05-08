import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Modal.css";

const Modalrepository = (props) => {
  const { open, close } = props;
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴.

  // 삭제하기 api로 수정하여 button에 onClick 이벤트로 넣기
  // const submit = () => {
  //   Axios.post("http://localhost:3001/api/insert", {
  //     token: values.token,
  //     color: values.color,
  //     name: values.name,
  //     mail: values.mail,
  //     corporate: values.corporate,
  //     position: values.position,
  //     phonenumber: values.phonenumber,
  //     officenumber: values.officenumber,
  //     address: values.address,
  //     introduce: values.introduce,
  //     img: values.img,
  //     title: values.title,
  //   });
  // };

  const [data, setData] = useState([]);

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
            <button className="close">삭제</button>
            {/* 버튼에 삭제하기 api 추가하기 */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modalrepository;