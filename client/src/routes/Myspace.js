import React, { useRef, useState } from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import domtoimage from "dom-to-image-more";
import fileDownload from 'file-saver';
import multer from "multer";
import mycanvas from "canvas";
import fs, { link } from "fs";
import { saveAs } from "file-saver";
import jpg from "jpeg-js";
import { save } from "save-file";

function convertURIToImageData(URI) {
  return new Promise(function(resolve, reject) {
    if (URI == null) return reject();
    let canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        image = new Image();
    image.addEventListener('load', function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = URI;
  });
}

//명함 만들기 main 화면
const MakemainPositioner = styled.div`
  display: flex;
`;
// 출력폼
const Outputform = styled.div`
  display: flex;
  width: 50%;
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
  align-items: center;
  flex-direction: column;
`;

const Outputcorporate = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  height: 65px;
  margin-top: 1rem;
  border-bottom-style: solid;
  font-size: 35px;
`;

const Outputname = styled.div`
  width: 90%;
  height: 50px;
  margin-top: 1rem;
  font-size: 50px;
`;

const Outputposition = styled.div`
  width: 90%;
  height: 50px;
  margin-top: 1rem;
  font-size: 30px;
`;

const Outputphonenumber = styled.div`
  width: 90%;
  height: 35px;
  margin-top: 1rem;
  font-size: 20px;
`;

const Outputofficenumber = styled.div`
  width: 90%;
  height: 35px;
  margin-top: 1rem;
  font-size: 20px;
`;

const Outputemail = styled.div`
  width: 90%;
  height: 35px;
  margin-top: 1rem;
  font-size: 20px;
`;

const Outputaddress = styled.div`
  width: 90%;
  height: 35px;
  margin-top: 1rem;
  font-size: 20px;
`;

const Outputintroduceheader = styled.label`
  width: 90%;
  margin-top: 1rem;
  font-size: 25px;
  border-top-style: solid;
  text-align: center;
`;

const Outputintroduce = styled.div`
  width: 90%;
  margin-top: 1rem;
  font-size: 20px;
`;

// 입력폼
const Inputform = styled.div`
  width: 50%;
  height: 100vh;
  margin-top: 1rem;
`;
// 명함 컬러 선택하기
const Cololselector = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  flex-wrap: wrap;
`;

const Colorbuttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// 기본 정보 입력하기
const Infotitle = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  font-size: 20px;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Infoinputs = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const Infoinputposition = styled.div``;

const Infoinput = styled.input`
  width: 500px;
  font-size: 15px;
  margin-top: 0.5rem;
  margin-left: 2rem;
  margin-right: 8rem;
  border-radius: 15px;
`;

const Introduceinput = styled.textarea`
  width: 500px;
  height: 230px;
  font-size: 15px;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 8rem;
  border-radius: 15px;
`;

function Myspace({ usertoken }) {
  const { token } = usertoken || {}; // App.js에서 token값 가져오기

  const [values, setValues] = useState({
    token: token,
    color: "",
    name: "",
    mail: "",
    corporate: "",
    position: "",
    phonenumber: "",
    officenumber: "",
    address: "",
    introduce: "",
    image: "",
  });

  const handleChange = (e) => {
    // Basicinfo input eventhandle function
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    // Colorselect button eventhandle function
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = () => {
/*
    domtoimage.toJpeg(document.getElementById('my-node'), { quality: 0.95 })
    .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
*/

/*
    fetch('/api/contents/manageCard/create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    
  };
*/
  fetch('/api/contents/manageCard/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
      color: values.color,
      name: values.name,
      mail: values.mail,
      corporate: values.corporate,
      position: values.position,
      phonenumber: values.phonenumber,
      officenumber: values.officenumber,
      address: values.address,
      introduce: values.introduce,
      image:  'test',
    })
  })
  //console.log(domtoimage.toBlob(document.getElementById("outputimg")));
  
/*
  let node = document.getElementById('outputimg');
  let img = new Image();
    domtoimage.toPng(node).then(function (dataUrl) {
        img.src = dataUrl;
        document.body.appendChild(img);
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    img.width
*/
/*
let temp = domtoimage.toBlob(document.getElementById('outputimg'))
let blob = new Blob([temp], { type: "image/png" });
let url = URL.createObjectURL(blob);
let img = new Image();
img.src = url;
console.log("data length: " + temp.length);
console.log("url: " + url);
document.body.appendChild(img);
*/

/***
let node = document.getElementById('outputimg');
let saveDataUrl;
domtoimage.toPng(node)
    .then(function (dataUrl) {
        let img = new Image();
        saveDataUrl = dataUrl;
        img.src = dataUrl;
        console.log(dataUrl);
        //document.body.appendChild(img);
        convertURIToImageData(dataUrl).then(function(imageData) {
        // Here you can use imageData
        console.log(imageData);
        });
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
*/

/*
let img = new Image();
  let image = domtoimage.toCanvas(document.getElementById('outputimg'))
    .then(function (canvas) {
      
      mycanvas.createImageData(image, image.width, image.height);
      let buffer = mycanvas.toBuffer('image/jpeg')
      console.log('canvas', canvas.width, canvas.height);

    });
  
    let buffer = mycanvas.toBuffer('image/jpeg')
    fs.writeFileSync('./image.jpeg', buffer)
*/
};

  return (
    <MakemainPositioner>
      <Sidebar />
      <Outputform>
        <Outputlayer id="outputimg" style={{ backgroundColor: values.color }}>
          <Outputcorporate>{values.corporate}</Outputcorporate>
          <Outputname>{values.name}</Outputname>
          <Outputposition>{values.position}</Outputposition>
          <Outputphonenumber>{values.phonenumber}</Outputphonenumber>
          <Outputofficenumber>{values.officenumber}</Outputofficenumber>
          <Outputemail>{values.mail}</Outputemail>
          <Outputaddress>{values.address}</Outputaddress>
          <Outputintroduceheader>INTRODUCE</Outputintroduceheader>
          <Outputintroduce>{values.introduce}</Outputintroduce>
        </Outputlayer>
      </Outputform>
      <Inputform>
        <Cololselector>
          명함 컬러 선택하기
          <Colorbuttons>
            <button name="color" value="red" onClick={handleClick}>
              빨강
            </button>
            <button name="color" value="orange" onClick={handleClick}>
              주황
            </button>
            <button name="color" value="yellow" onClick={handleClick}>
              노랑
            </button>
            <button name="color" value="blue" onClick={handleClick}>
              파랑
            </button>
          </Colorbuttons>
        </Cololselector>
        <Infotitle>기본 정보 입력하기</Infotitle>
        <Infoinputs>
          <Infoinputposition>
            <label>이름</label>
            <Infoinput
              type="text"
              name="name"
              value={values.name}
              placeholder="   이름을 입력하세요"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <lable>메일주소</lable>
            <Infoinput
              type="text"
              name="mail"
              value={values.mail}
              placeholder="   e-mail을 입력하세요"
              onChange={handleChange}
            />
          </Infoinputposition>
        </Infoinputs>
        <Infotitle>추가 정보 입력하기</Infotitle>
        <Infoinputs>
          <Infoinputposition>
            <label>회사명</label>
            <Infoinput
              type="text"
              name="corporate"
              value={values.corporate}
              placeholder="   회사명을 입력하세요"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <lable>직급</lable>
            <Infoinput
              type="text"
              name="position"
              value={values.position}
              placeholder="   직급을 입력하세요"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <lable>휴대폰번호</lable>
            <Infoinput
              type="text"
              name="phonenumber"
              value={values.phonenumber}
              placeholder="   휴대폰번호를 입력하세요(010-XXXX-XXXX)"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <lable>전화번호</lable>
            <Infoinput
              type="text"
              name="officenumber"
              value={values.officenumber}
              placeholder="   전화번호를 입력하세요(02-XXX-XXXX)"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <lable>주소</lable>
            <Infoinput
              type="text"
              name="address"
              value={values.address}
              placeholder="   주소를 입력하세요"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <lable>소개</lable>
            <Introduceinput
              type="text"
              name="introduce"
              value={values.introduce}
              placeholder="   나를 설명할 수 있는 소개글을 작성해보세요"
              onChange={handleChange}
            />
          </Infoinputposition>
          <Infoinputposition>
            <button id="submitbtn" onClick={submit}>
              버튼
            </button>
          </Infoinputposition>
        </Infoinputs>
      </Inputform>
    </MakemainPositioner>
  );
}

export default Myspace;
