import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import domtoimage from "dom-to-image";
import Modal from "../Components/Modal";
import axios from "axios";

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
  align-items: center;
  flex-direction: column;
`;

const Infoinputposition = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.5rem;
`;

const Infoinput = styled.input`
  width: 60%;
  height: 20px;
  font-size: 15px;
  margin-top: 0.6rem;
  margin-left: 2rem;
  margin-right: 7rem;
  border-radius: 15px;
`;

const Introduceinput = styled.textarea`
  width: 80%;
  height: 230px;
  font-size: 15px;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 3rem;
  border-radius: 15px;
`;

const Submitbutposition = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
`;

const Submitbtn = styled.button`
  width: 40%;
  height: 50px;
  min-width: 200px;
  background-color: #a259ff;
  border-style: none;
`;

function Myspace({ usertoken, usermail }) {
  const { token } = usertoken || {}; // App.js에서 token값 가져오기
  const { logmail } = usermail || {}; // App.js에서 logmail값 가져오기
  const [duplicated, setDuplicated] = useState(true);
  //명함이름 중복체크 후 중복되지 않으면 true, 중복된다면 false
  const [values, setValues] = useState({
    token: token,
    userEmail: logmail,
    color: "",
    name: "",
    mail: "",
    corporate: "",
    position: "",
    phonenumber: "",
    officenumber: "",
    address: "",
    introduce: "",
    img: "",
    title: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const titleBoolean = 'N';
  const openModal = (e) => {
    setModalOpen(true);
    const { name } = e.target;
    domtoimage
      .toBlob(document.getElementById("outputimg"))
      .then(function (blob) {
        let reader = new FileReader(); //캡쳐한 blob을 dataurl로 변환
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let base64data = reader.result;
          setValues({ ...values, [name]: base64data });
        };
      });
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangeduplicated = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values.mail);
    console.log(values.title);
    async function duplicatedcheck() {
      //중복체크 API 호출
      const result = await axios({
        method: "POST",
        url: "/api/contents/manageCard/titleCheck",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userEmail: values.userEmail,
          title: values.title,
        },
      });

      console.log(JSON.parse(JSON.stringify(result)).data);
      if (JSON.parse(JSON.stringify(result)).data >= 1) {
        //명함이름이 중복되면 result가 1이기에
        setDuplicated(false); //duplicated변수는 명함이름이 중복되면 false를 가진다.
      }
    }
    duplicatedcheck();
  };

  const handleClick = (e) => {
    // Colorselect button eventhandle function
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  console.log(values);

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
          <Submitbutposition>
            <Submitbtn name="img" onClick={openModal}>
              저장
            </Submitbtn>
            {/* header 부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} values={values} >
              {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. */}
              명함 이름을 지어주세요
              <input
                name="title"
                value={values.title}
                onChange={handleChangeduplicated}
                placeholder="명함 이름을 입력하세요"
              ></input>
              {duplicated ? (
                <label>사용가능한 이름입니다.</label> //duplicated의 값이 true이면 실행
              ) : (
                <label>중복됩니다.</label> //duplicated의 값이 false면 실행
              )}
            </Modal>
          </Submitbutposition>
        </Infoinputs>
      </Inputform>
    </MakemainPositioner>
  );
}

export default Myspace;
