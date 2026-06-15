const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")
const MovieList = require("../models/movie_list")

usersRouter.post("/", async (req, res) => {
    const { username, password } = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash,
    })

    const savedUser = await user.save()

    const watchlist = new MovieList({
        userId: savedUser._id,
        isWatchList: true,
        name: "Watchlist",
    })

    await watchlist.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter