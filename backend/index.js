const express = require("express")
const app = express()
const usersRouter = require("./controllers/users")

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", usersRouter)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})