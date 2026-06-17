const moviesRouter = require("express").Router()
const MovieLog = require("../models/movie_log")
const User = require("../models/user")
const decodeToken = require("../services/token_service")
const userExtractor = require("../middleware/user_extractor")

moviesRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const movie = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    )
    const data = await movie.json()
    console.log(data)
})

moviesRouter.get("/search/:query", async (req, res) => {
    const query = req.params.query
    const movies = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`
    )
    const data = await movies.json()
    console.log(data.results)
})

moviesRouter.get("/advancedsearch", async (req, res) => {
    const queries = req.query
    console.log(queries)
    /*const movies = await fetch(
        `https://api.themoviedb.org/3/discover/movie?QUERIES_HERE&api_key=${process.env.TMDB_API_KEY}`
    )*/
})

moviesRouter.post("/log", userExtractor, async (req, res) => {
    const body = req.body
    const user = req.user

    const loggedMovie = new MovieLog({
        userId: user._id,
        movieId: body.movieId,

        watched: body.watched,
        watchedAt: body.watchedAt,
        rating: body.rating,
        review: body.review,
        owned: body.owned,
    })

    const savedLog = loggedMovie.save()

    res.status(201).json(savedLog)
})

moviesRouter.put("/log/:id", userExtractor, async (req, res) => {
    const id = req.params.id
    const body = req.body
    const user = req.user

    const loggedMovie = await MovieLog.findOne({id: id, userId: user.id})

    if (!loggedMovie) {
        return res.status(400).json({ error: "Invalid Logged Movie or User ID" })
    }

    loggedMovie.watched = body.watched ? body.watched : loggedMovie.watched
    loggedMovie.watchedAt = body.watchedAt ? body.watchedAt : loggedMovie.watchedAt
    loggedMovie.rating = body.rating ? body.rating : loggedMovie.rating
    loggedMovie.review = body.review ? body.review : loggedMovie.review
    loggedMovie.owned = body.owned ? body.owned : loggedMovie.owned

    const savedLog = loggedMovie.save()

    res.status(201).json(savedLog)

})


module.exports = moviesRouter