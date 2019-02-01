const express = require("express");
const AuthControllers = require('../controllers/auth')
const passport = require('passport')

const router = express.Router();

router.post("/register",AuthControllers.register );
router.post("/login", AuthControllers.login);
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("hello")
})

module.exports = router;
