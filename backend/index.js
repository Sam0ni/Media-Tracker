require("dotenv").config()
const express = require("express")
const app = express()
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const connect_to_db = require("./config/database_connection")

app.use(express.json())

const db_url = process.env.MONGODB_URL
connect_to_db(db_url)


app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})