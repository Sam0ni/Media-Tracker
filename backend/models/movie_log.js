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

movieLogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const MovieLog = mongoose.model("MovieLog", movieLogSchema)

module.exports = MovieLog