//=================================
//   	user_uploadImage.js
// https://bigexecution.tistory.com/7
//=================================

const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

//diskStorage 엔진으로 파일저장경로와 파일명을 세팅한다. 
let storage = multer.diskStorage({ //multer disk storage settings
    destination: function(req, file, callback) {
        callback(null, "routes/user/image/")
    },
    filename: function(req, file, callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});


//특정 파일형식만 저장하기 위해서는 fileFilter함수를 사용한다. 
const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.pdf' && ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only .xlsx .pdf .png, .jpg .gif and .jpeg format allowed!'))
        }
        callback(null, true)
    },
}).any(); //.any()는 전달받는 모든 파일을 받는다. 파일배열은 req.files에 저장되어 있다. 

router.post('/', (req, res, next) => {
    const reqFiles = [];
    try {
        upload(req, res, function(err) {
            if (err) {
                return res.status(400).send({ //에러발생하면, 에러 메시지와 빈 파일명 array를 return한다. 
                    message: err.message,
                    files: reqFiles
                });
            }

            for (var i = 0; i < req.files.length; i++) { //저장된 파일명을 차례로 push한다. 
                reqFiles.push(req.files[i].filename)
            }

            res.status(200).send({ //저장 성공 시, 저장성공 메시지와 저장된 파일명 array를 return한다. 
                message: "Uploaded the file successfully",
                files: reqFiles
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: `Could not upload the file: ${err}`,
            files: reqFiles
        });
    }
});

module.exports = router;

/*
// multer-optional
var storage = multer.diskStorage({
 destination: (req, file, cb) => {  // multer의 DiskStorage엔진을 이용해서 upload라는 static폴더에 파일들이 저장되도록 경로 지정
   cb(null, "upload/");
 },
 filename: (req, file, cb) => {     // 파일 이름의 중복을 막기위해 Date.now() 메서드로 저장될 파일마다 고유한 이름 지정
   cb(null, `${Date.now()}_${file.originalname}`);
 },
});
var upload = multer({ storage: storage }).single("profile_img");

// Router
router.post("/upload", (req, res) => {
 upload(req, res, (err) => {
   if (err) {
     return res.json({ success: false, err });
   }
   return res.json({
     success: true,
     image: res.req.file.path,
     fileName: res.req.file.filename,
   });
 });
});

module.exports = router;
*/