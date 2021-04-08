import React from "react";
import { Link } from "react-router-dom";

function testCardPost() {
    const testPostClickHandler = () => {
        fetch('/api/contents/manageCard/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name : '박준',
                mail : '0404pj@naver.com',
                corporate : '아코이앤씨',
                position : 'employee',
                phonenumber : '01077288550',
                officenumber : '02-',
                address : '구로동 98-10',
                introduce : '안녕하세요. 박준입니다.',
            })
          })
    }

    const titleCheckClickHandler = async() => {
        fetch('/api/contents/manageCard/titleCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title : 'test',
            })
          })
        
        const response = await fetch('/api/contents/manageCard/titleCheck');
        const body = await response.json();
        console.log(body);
    }

    return (
        <div>
        <button onClick={titleCheckClickHandler}>test</button>
        </div>
    );
}
export default testCardPost;