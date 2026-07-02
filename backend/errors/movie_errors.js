class MovieNotFoundError extends Error {
    constructor(message = "Movie not Found") {
        super(message)
        this.name = "MovieNotFoundError"
    }
}

class MovieServiceAuthError extends Error {
    constructor(message = "TMDB authentication failed") {
        super(message)
        this.name = "MovieServiceAuthError"
    }
}

class MovieRateLimitError extends Error {
    constructor(message = "Rate Limit exceeded") {
        super(message)
        this.name = "MovieRateLimitError"
    }
}

class MovieServiceError extends Error {
    constructor(message) {
        super(message)
        this.name = "MovieServiceError"
    }
}

class InvalidMovieOrUserIdError extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidMovieOrUserIdError"
    }
}

module.exports = {
    MovieNotFoundError,
    MovieServiceAuthError,
    MovieRateLimitError,
    MovieServiceError,
    InvalidMovieOrUserIdError,
}