const errorHandler = (error, req, res, next) => {
    console.log(error)

    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "token invalid" })
    }
    if (error.name === "UserNotFoundError") {
        return res.status(400).json({ error: 'UserId missing or not valid' })
    }
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id' })
    }

    return res.status(500).json({ error: 'internal server error' })
}

module.exports = errorHandler