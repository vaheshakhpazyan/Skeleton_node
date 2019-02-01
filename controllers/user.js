const User = require('../models/user')

class UserController {
    async uploadImage(req, res) {
        try {            
            if (req.user && req.user._id && req.user.imageSrc === '') {
                const candidate = await User.findOne({ _id: req.user._id })
                if (req.file) {
                    candidate.set({ imageSrc: req.file.path })
                    await candidate.save()
                    res.send(candidate)                   
                } else {
                    res.status(400).json({type: "error", massage: "Please send file"})
                }
            } else {
               res.status(400).json({type: "error", massage: "any error"}) 
            }
        } catch (error) {
            res.send(req.body)
        }
    }
}

module.exports = new UserController()