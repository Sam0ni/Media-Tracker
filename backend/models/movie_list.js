const mongoose = require("mongoose")

const movieListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    isWatchList: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true,
    },
    movieIds: [Number]
})

const MovieList = mongoose.model("MovieList", movieListSchema)

module.exports = MovieList