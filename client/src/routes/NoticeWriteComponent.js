import UploadFiles from './UploadFiles';
import React, { useState } from "react";
const NoticeWriteComponent = () => {

    const uploadReferenece = React.createRef();

    async function onClickSearch() {
        await uploadReferenece.current.upload().then(function (result) {
            const files = result;
            alert('저장 완료');
        }).catch(function (err) {
        });
    }

    return (
       <div>
          <UploadFiles ref={uploadReferenece} />
          <div className="text-center pd12">
             <button className="lf-button primary" onClick={onClickSearch}>저장</button>
          </div>
      </div>
    )
};

export default NoticeWriteComponent;