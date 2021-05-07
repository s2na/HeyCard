import React, { useState } from "react";
import styled from "styled-components";

const Cardposition = styled.div`
  width: 250px;
  height: 380px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Img = styled.img`
  min-height: 350px;
`;

const Cardtitle = styled.label`
  font-size: 20px;
`;

const Togglebtn = styled.button`
  position: absolute;
  left: 0px;
  border-style: none;
  background: none;
  cursor: pointer;
`;

const Togglebox = styled.div`
  width: 100px;
  height: 70px;
  background-color: beige;
  position: absolute;
  top: 5px;
  left: 25px;
  display: flex;
  flex-direction: column;
`;

function Card({
  address,
  color,
  corporate,
  img,
  introduce,
  logmail,
  mail,
  name,
  officenumber,
  phonenumber,
  title,
  token,
}) {
  const [toggleon, setToggleon] = useState(false);

  const onClick = () => {
    setToggleon(!toggleon);
  };

  return (
    <Cardposition>
      <Img src={img} width="250px" height="350px" />
      <div className="card_data">
        <Cardtitle className="card_title">
          {title}
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.93056 16.1114L1.61111 21.8058C1.5656 22.014 1.56716 22.2297 1.61568 22.4372C1.6642 22.6447 1.75846 22.8387 1.89157 23.0051C2.02468 23.1715 2.19328 23.306 2.38506 23.3989C2.57683 23.4918 2.78692 23.5407 3 23.5419C3.09929 23.552 3.19933 23.552 3.29861 23.5419L9.02778 22.2225L20.0278 11.2642L13.8889 5.13916L2.93056 16.1114Z"
              fill="#A259FF"
            />
            <path
              d="M23.4861 5.77789L19.3889 1.68067C19.1195 1.41266 18.755 1.26221 18.375 1.26221C17.995 1.26221 17.6305 1.41266 17.3611 1.68067L15.0833 3.95845L21.2153 10.0904L23.493 7.81262C23.6263 7.67864 23.7319 7.5197 23.8037 7.34488C23.8755 7.17006 23.9121 6.9828 23.9115 6.79381C23.9108 6.60483 23.8729 6.41782 23.7999 6.24349C23.727 6.06917 23.6203 5.91095 23.4861 5.77789Z"
              fill="#A259FF"
            />
          </svg>
        </Cardtitle>
      </div>
      <Togglebtn onClick={onClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14C7.53043 14 8.03914 13.7893 8.41421 13.4142C8.78929 13.0391 9 12.5304 9 12C9 11.4696 8.78929 10.9609 8.41421 10.5858C8.03914 10.2107 7.53043 10 7 10C6.46957 10 5.96086 10.2107 5.58579 10.5858C5.21071 10.9609 5 11.4696 5 12C5 12.5304 5.21071 13.0391 5.58579 13.4142C5.96086 13.7893 6.46957 14 7 14Z"
            fill="black"
          />
          <path
            d="M14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12Z"
            fill="black"
          />
          <path
            d="M17 14C17.5304 14 18.0391 13.7893 18.4142 13.4142C18.7893 13.0391 19 12.5304 19 12C19 11.4696 18.7893 10.9609 18.4142 10.5858C18.0391 10.2107 17.5304 10 17 10C16.4696 10 15.9609 10.2107 15.5858 10.5858C15.2107 10.9609 15 11.4696 15 12C15 12.5304 15.2107 13.0391 15.5858 13.4142C15.9609 13.7893 16.4696 14 17 14Z"
            fill="black"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12ZM22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z"
            fill="black"
          />
        </svg>
      </Togglebtn>
      {toggleon ? (
        <Togglebox>
          <button>공유하기</button>
          <button>수정하기</button>
          <button>삭제하기</button>
        </Togglebox>
      ) : (
        <div />
      )}
    </Cardposition>
  );
}

export default Card;