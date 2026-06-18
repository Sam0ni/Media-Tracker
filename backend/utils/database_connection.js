const mongoose = require("mongoose")


const connect_to_db = (url) => {
    mongoose.set("strictQuery", false)

    console.log("connecting to db at url:", url)

    mongoose.connect(url, { family: 4 })
        .then(res => {
            console.log("Connected succesfully to DB!")
        })
        .catch(err => {
            console.log("error connecting to DB:", err.message)
        })
}

module.exports = connect_to_db