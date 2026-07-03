const { InvalidMovieOrUserIdError } = require("../errors/movie_errors")
const { ValidationError } = require("../errors/common_errors")
const MovieLog = require("../models/movie_log")

class MovieService{
    async add_movie_log(body, user) {
        if (body.rating !== null || body.watchedAt !== null || body.review !== null) {
            body.watched = true
        }

        if (body.rating > 10 || body.rating < 0) {
            throw new ValidationError("Rating must be between 0 and 10")
        }

        const loggedMovie = new MovieLog({
            userId: user._id,
            movieId: body.movieId,

            watched: body.watched,
            watchedAt: body.watchedAt,
            rating: body.rating,
            review: body.review,
            ownedFormats: body.ownedFormats,
        })

        const savedLog = await loggedMovie.save()

        return savedLog
    } 

    async edit_movie_log(id, body, user) {
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

        if (body.ownedFormats) {
            body.ownedFormats = [...new Set(body.ownedFormats)];
        }


        loggedMovie.watched = body.watched === undefined ? loggedMovie.watched : body.watched
        loggedMovie.watchedAt = body.watchedAt === undefined ? loggedMovie.watchedAt : body.watchedAt
        loggedMovie.rating = body.rating === undefined ? loggedMovie.rating : body.rating
        loggedMovie.review = body.review === undefined ? loggedMovie.review : body.review
        loggedMovie.ownedFormats = body.ownedFormats === undefined ? loggedMovie.ownedFormats : body.ownedFormats

        const savedLog = await loggedMovie.save()

        return savedLog
    }
}
module.exports = new MovieService()