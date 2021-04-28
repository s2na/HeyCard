import React from "react";
import "../Modal.css";

const Modal = (props) => {
  const { open, close, header } = props;
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴.
  return (
    //모달이 열릴때 openModal클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
