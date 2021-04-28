import React from "react";
import Sidebar from "../Components/Sidebar";

function Repository() {

  function getContents(){
    return fetch('/api/contents/manageCard/select', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '박준',   // 카카오톡 이메일을 가져와서 body에 실어 서버로 요청필요
    })
  })
  .then(res => res.json())
  .then(response => {
    //console.log('Success:', JSON.stringify(response))
    return JSON.stringify(response);

  })
  }
  getContents().then(response => console.log(JSON.parse(response)));
  getContents().then(response => console.log(JSON.parse(response)[0]));
  getContents().then(response => console.log(JSON.parse(response)[0].mail));


  return (
    <div>
     <Sidebar />
     
      Repository페이지
    </div>
  );
}

export default Repository;