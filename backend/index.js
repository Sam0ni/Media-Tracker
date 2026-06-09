require("dotenv").config()
const express = require("express")
const app = express()
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})