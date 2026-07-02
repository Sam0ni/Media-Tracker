const { InvalidMovieOrUserIdError } = require("../errors/movie_errors")
const { ValidationError } = require("../errors/common_errors")
const MovieLog = require("../models/movie_log")


const add_movie_log = async (body, user) => {
    
} 

const edit_movie_log = async (id, body, user) => {
    const loggedMovie = await MovieLog.findOne({_id: id, userId: user.id})
    
    if (!loggedMovie) {
        throw new InvalidMovieOrUserIdError("Invalid Logged Movie or User ID")
    }

    if (body.watched === false) {
        body.rating = null
        body.watchedAt = null
        body.review = null
    }

    if (body.rating !== null || body.watchedAt !== null || body.review !== null) {
        body.watched = true
    }

    if (body.rating > 10 || body.rating < 0) {
        throw new ValidationError("Rating must be between 0 and 10")
    }

    if (body.owned) {
        body.owned = [...new Set(body.owned)];
    }


    loggedMovie.watched = body.watched === undefined ? loggedMovie.watched : body.watched
    loggedMovie.watchedAt = body.watchedAt === undefined ? loggedMovie.watchedAt : body.watchedAt
    loggedMovie.rating = body.rating === undefined ? loggedMovie.rating : body.rating
    loggedMovie.review = body.review === undefined ? loggedMovie.review : body.review
    loggedMovie.ownedFormats = body.owned === undefined ? loggedMovie.ownedFormats : body.owned

    const savedLog = await loggedMovie.save()
}