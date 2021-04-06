import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const upload = (file) => {
    let formData = new FormData();

    for (const key of Object.keys(file)) {
        formData.append('file', file[key]);
    }
    //formData.append("file", file);

    return axios.post("/api/user/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};

export default {
    upload
};
