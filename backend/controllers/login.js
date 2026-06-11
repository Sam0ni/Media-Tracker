const create_token = require("../services/token_service")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "Invalid username or password"
        })
    }

    const token = create_token(user.username, user._id)

    res.status(200).send({ token, username: user.username })
})

module.exports = loginRouter