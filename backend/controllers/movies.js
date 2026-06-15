const moviesRouter = require("express").Router()

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

moviesRouter.post("/")


module.exports = moviesRouter