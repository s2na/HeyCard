import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Axios from "axios";
import axios from "axios";
import Card from "../Components/Card";

//명함 만들기 main 화면
const MakemainPositioner = styled.div`
  display: flex;
`;

const Outputform = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin-top: 4rem;
  justify-content: center;
`;

const Searchbox = styled.div`
  width: 20%;
  height: 30px;
  position: absolute;
  right: 50px;
  top: 90px;
  display: flex;
  border-bottom: solid;
`;

const Searchinput = styled.input`
  border-style: none;
  width: 100vh;
`;

const Searchbtn = styled.button`
  border-style: none;
  background: none;
  cursor: pointer;
`;

const Outputlayer = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  font-family: "Noto Sans KR", sans-serif;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function getContents(repositoken, reposimail){

  return fetch('/api/contents/manageCard/select', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail: reposimail,
      token: repositoken,
    })
  })
  .then(res => res.json())
  .then(response => {
    //console.log(repositoken);
    //console.log(reposimail);
    //console.log('Repoist Select Success:', JSON.stringify(response))
    //return JSON.stringify(response);
    return response;
  })
}


function Repository({ usertoken, usermail }) {
  const [data, setData] = useState([]);
  const { repositoken } = usertoken || {}; // App.js에서 token값 가져오기
  const { reposimail } = usermail || {}; // App.js에서 logmail값 가져오기
  const [searchdata, setSearchdata] = useState("");

  useEffect(() => {
    // DB에 있는 모든 정보들을 호출하는 API가 컴포넌트 마운트 전에 실행
    let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
    console.log(usertoken);
    console.log(usermail);
    async function get() {
      const result = getContents(usertoken.token, usermail.logmail);
      if (!completed) {
        setData(result.data);
        console.log(result.data);
      }
    }
    get();
    return () => {
      completed = true;
    };
    //query가 변할때 useEffect를 실행해야하는 시점이다.
  }, []);

  const filterCard = data.filter((item) => {
    return item.title.toLowerCase().includes(searchdata);
  });

  const handleChange = (e) => {
    setSearchdata(e.target.value);
  };

  return (
    <MakemainPositioner>
      <Sidebar />
      <Searchbox>
        <Searchinput
          type="text"
          name="searchdata"
          value={searchdata}
          onChange={handleChange}
          placeholder="명함이름을 검색하세요"
        />
        <Searchbtn>
          <svg
            width="20"
            height="15"
            viewBox="0 0 36 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.332 25.5171C34.8867 25.839 34.3535 26 33.7324 26C33.1113 26 32.5781 25.839 32.1328 25.5171L25.1719 20.4848C22.3594 21.9928 19.2188 22.7468 15.75 22.7468C13.6172 22.7468 11.5781 22.4461 9.63281 21.8446C7.6875 21.2431 6.01172 20.434 4.60547 19.4174C3.19922 18.4008 2.08008 17.1935 1.24805 15.7957C0.416016 14.3978 0 12.9238 0 11.3734C0 9.82307 0.416016 8.34474 1.24805 6.93842C2.08008 5.53209 3.19922 4.32486 4.60547 3.31672C6.01172 2.30857 7.6875 1.50375 9.63281 0.902248C11.5781 0.300749 13.6172 0 15.75 0C17.8828 0 19.9219 0.300749 21.8672 0.902248C23.8125 1.50375 25.4883 2.30857 26.8945 3.31672C28.3008 4.32486 29.4199 5.53209 30.252 6.93842C31.084 8.34474 31.5 9.81883 31.5 11.3607C31.5 13.8853 30.457 16.1558 28.3711 18.172L35.332 23.2043C35.7773 23.5262 36 23.9117 36 24.3607C36 24.8097 35.7773 25.1952 35.332 25.5171ZM15.75 3.25318C13.7109 3.25318 11.8301 3.61323 10.1074 4.33333C8.38477 5.05344 7.01953 6.0404 6.01172 7.29423C5.00391 8.54806 4.5 9.90779 4.5 11.3734C4.5 12.839 5.00391 14.1988 6.01172 15.4526C7.01953 16.7064 8.38477 17.6934 10.1074 18.4135C11.8301 19.1336 13.7109 19.4936 15.75 19.4936C17.7891 19.4936 19.6699 19.1336 21.3926 18.4135C23.1152 17.6934 24.4805 16.7064 25.4883 15.4526C26.4961 14.1988 27 12.839 27 11.3734C27 9.90779 26.4961 8.54806 25.4883 7.29423C24.4805 6.0404 23.1152 5.05344 21.3926 4.33333C19.6699 3.61323 17.7891 3.25318 15.75 3.25318Z"
              fill="#A259FF"
            />
          </svg>
        </Searchbtn>
      </Searchbox>
      <Outputform>
        <Outputlayer>
          {filterCard.map((item) => (
            <Card
              address={item.address}
              color={item.color}
              coporate={item.corporate}
              image={item.image}
              introduce={item.introduce}
              logmail={item.userEmail}
              mail={item.mail}
              name={item.name}
              officenumber={item.officenumber}
              phonenumber={item.phonenumber}
              title={item.title}
            />
          ))}
        </Outputlayer>
      </Outputform>
    </MakemainPositioner>
  );
}

export default Repository;



/*
useEffect(() => {
  let completed = false; //초기에는 실행해야 되기때문에 false flag 변수

  function getContents(){

    return fetch('/api/contents/manageCard/select', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //userEmail
        //token
      })
    })
    .then(res => res.json())
    .then(response => {
      //console.log('Success:', JSON.stringify(response))
      return JSON.stringify(response);
  
    })
  }
  const resultImage = getContents().then(response => console.log(JSON.parse(response)));
  //getContents().then(response => console.log(JSON.parse(response)[0]));
  //getContents().then(response => console.log(JSON.parse(response)[0].mail));
  
  
  }, []);
*/