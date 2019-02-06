const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const dbConfig = require('./configs/dbConfig')
const passport = require('passport')

const authRouter = require('./route/auth')
const userRouter = require('./route/user')

mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then(()=> console.log("MongoDB connected. "))
    .catch(error => console.log(error));


const app = express()
app.use('/uploads', express.static('uploads'))
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)

const port = process.env.PORT || 3011



app.listen(port, error => {
    if (error) throw error
    console.log(`Server 🚀 🚀 🚀 running on port ${port} `)
})
