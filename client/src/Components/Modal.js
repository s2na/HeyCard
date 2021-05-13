import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Modal.css";

const Modal = (props) => {
  const { open, close, values } = props;
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴.

  const submit = () => {
    Axios.post("/api/contents/manageCard/insert", {
      token: values.token,
      userEmail: values.userEmail,
      color: values.color,
      name: values.name,
      mail: values.mail,
      corporate: values.corporate,
      position: values.position,
      phonenumber: values.phonenumber,
      officenumber: values.officenumber,
      address: values.address,
      introduce: values.introduce,
      img: values.img,
      title: values.title,
    });
  };

  const [data, setData] = useState([]);

  /*
  useEffect(() => {
    //query를 리턴하는 함수를 result에 할당
    async function get() {
      const result = await Axios.post("/api/contents/manageCard/titleCheck");
      setData(result.data);
    }
    get();
    //query가 변할때 useEffect를 실행해야하는 시점이다.
  }, []);
  */
  return (
    //모달이 열릴때 openModal클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            명함이름
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={submit}>
              저장
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
