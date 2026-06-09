const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URL

console.log("connecting to db at url:", url)

mongoose.connect(url, { family: 4 })
    .then(res => {
        console.log("Connected succesfully to DB!")
    })
    .catch(err => {
        console.log("error connecting to DB:", err.message)
    })

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User