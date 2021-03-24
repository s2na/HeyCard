const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.use(passport.initialize())
router.use(passport.session())
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.get('/', (req, res) => {
    //res.send(req.user.accesstoken);
    console.log(req.body);
    res.redirect('./client/build/index.html');
});

module.exports = router;