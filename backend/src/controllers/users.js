const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()

usersRouter.post("/", async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
})

module.exports = usersRouter