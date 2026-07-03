const moviesRouter = require("express").Router()
const MovieLog = require("../models/movie_log")
const User = require("../models/user")
const decodeToken = require("../services/token_service")
const userExtractor = require("../middleware/user_extractor")
const TmdbClient = require("../services/tmdb_client")
const MovieService = require("../services/movie_service")

moviesRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const movie = await TmdbClient.getMovie(id)
    return res.json(movie)
})

moviesRouter.get("/search/:query", async (req, res) => {
    const query = req.params.query
    const movies = await TmdbClient.searchMovies(query)
    return res.json(movies)
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

    const savedLog = await MovieService.add_movie_log(body, user)

    res.status(201).json(savedLog)
})

moviesRouter.put("/log/:id", userExtractor, async (req, res) => {
    const id = req.params.id
    const body = req.body
    const user = req.user

    const savedLog = await MovieService.edit_movie_log(id, body, user)

    res.status(201).json(savedLog)

})


module.exports = moviesRouter