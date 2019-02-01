const express = require("express");
const UserControllers = require('../controllers/user')
const upload = require('../middleware/upload') 
const passport = require('passport')

const router = express.Router();


router.post("/upload/image", passport.authenticate('jwt', { session: false }), upload.single('image'), UserControllers.uploadImage);

module.exports = router;
