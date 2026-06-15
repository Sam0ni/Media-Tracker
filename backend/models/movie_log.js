const mongoose = require("mongoose")

const movieLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },

    movieId: {
        type: Number,
        required: true
    },
    watched: {
        type: Boolean,
        default: false,
    },

    watchedAt: Date,

    rating: {
        type: Number,
        min: 0,
        max: 10
    },

    review: String,

    ownedFormats: {
        type: [String],
        enum: ["physical", "digital"]
    },
})

const MovieLog = mongoose.model("MovieLog", movieLogSchema)

module.exports = MovieLog