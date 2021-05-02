import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

//명함 만들기 main 화면
const MakemainPositioner = styled.div`
  display: flex;
  border-style: solid;
`;
// 출력폼
const Outputform = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin-top: 1rem;
  justify-content: center;
`;

const Outputlayer = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  border-style: solid;
  border-radius: 20px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Cardlayer = styled.div`
  width: 250px;
  height: 500px;
  border-style: solid;
`;

function Repository() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let completed = false; //초기에는 실행해야 되기때문에 false flag 변수

    //query를 리턴하는 함수를 result에 할당
    async function get() {
      const result = await axios.get("http://localhost:3001/api/get");
      if (!completed) setData(result.data);
    }
    get();
    return () => {
      completed = true;
    };

    //query가 변할때 useEffect를 실행해야하는 시점이다.
  }, []);

  return (
    <MakemainPositioner>
      <Sidebar />
      <Outputform>
        <Outputlayer>
          <Cardlayer>
            {data.map((item) => (
              <img src={item.img} width="150" height="250"></img>
            ))}
          </Cardlayer>
        </Outputlayer>
      </Outputform>
    </MakemainPositioner>
  );
}

export default Repository;
