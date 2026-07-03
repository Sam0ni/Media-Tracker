const { MovieNotFoundError, MovieServiceAuthError, MovieRateLimitError, MovieServiceError } = require("../errors/movie_errors")

const throwTmdbError = (res) => {
    switch (res.status) {
        case 404:
            throw new MovieNotFoundError()

        case 401:
            throw new MovieServiceAuthError("Invalid API key")
        
        case 429:
            throw new MovieRateLimitError("Rate limit exceeded")
        
        default: 
            throw new MovieServiceError(
                `TMDB error: ${res.status}`
            )
    }
}

const requestTmdbApi = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
        throwTmdbError(res)
    }

    return await res.json()
}


class TmdbClient {
    async getMovie(id) {
        const movie = await requestTmdbApi(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
        )

        return movie
    }

    async searchMovies(query) {
        const movies = await requestTmdbApi(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`
        )

        return movies
    }
}

module.exports = new TmdbClient()