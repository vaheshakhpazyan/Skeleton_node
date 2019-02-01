const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const keys = require('../configs/keys')
const mailer = require('../helpers/mailer')

const { registerFormValidation } = require('../helpers/validation')

class Auth {
    //login
    async login(req, res) {
        const { email, password } = req.body
        if (!email || !email.trim() || !password) {
            res.status(400).json({ type: "error", message: "invalid param" })
        }
        const candidate = await User.findOne({ email })

        if (candidate) {
            const passwordResult = bcrypt.compareSync(password, candidate.password)
            if (!passwordResult) {
                res.status(401).json({ type: "error", message: "unauthorized" })
            } else {
                mailer().catch(err => console.log(err))
                const token = jwt.sign({
                    email: candidate.email,
                    id: candidate._id,
                    lastName: candidate.lastName,
                    firstName: candidate.firstName,
                }, keys.jwt, { expiresIn: 60 * 60 * 5 })
                res.status(200).json({
                    id: candidate._id,
                    email: candidate.email,
                    firstName: candidate.firstName,
                    lastName: candidate.lastName,
                    token: `Bearer ${token}`,
                })
            }


        } else {
            res.status(404).json({ type: "error", message: `user email not found` })
        }

    }
    // register
    async register(req, res) {
        // error list
        const errorList = registerFormValidation(req.body)
        if (errorList.length > 0) {
            // have error
            res.status(400).json({ type: "error", errorList })
        } else {
            // valid data
            try {
                const user = await User.findOne({ email: req.body.email })
                if (user) {
                    res.status(400).json({ type: "error", message: "such user already exists" })
                } else {
                    const salt = bcrypt.genSaltSync(10)

                    const newUser = new User({ ...req.body, password: bcrypt.hashSync(req.body.password, salt) })
                    await newUser.save()
                    const token = jwt.sign({
                        email: newUser.email,
                        id: newUser._id,
                        lastName: newUser.lastName,
                        firstName: newUser.firstName,
                    }, keys.jwt, { expiresIn: 60 * 60 * 5 })
                    res.status(201).json({
                        type: "success", message: "user has been created",
                        data: {
                            id: newUser._id,
                            email: newUser.email,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            token: `Bearer ${token}`
                        }
                    })
                }


            } catch (e) {
                console.log(e)
                res.status(500).json({ type: "error", message: "server error" })
            }

        }

    }
}

module.exports = new Auth()