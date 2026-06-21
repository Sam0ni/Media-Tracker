const config = require("./utils/config")
const express = require("express")
const app = express()
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const movieRouter = require("./controllers/movies")
const connect_to_db = require("./utils/database_connection")
const errorHandler = require("./middleware/error_handler")

app.use(express.json())

connect_to_db(config.MONGODB_URL)


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/movies", movieRouter)

app.use(errorHandler)

module.exports = app