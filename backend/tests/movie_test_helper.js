const MovieLog = require("../models/movie_log")
const { Types } = require("mongoose");

const initialLogs = [
    {
        userId: new Types.ObjectId(),
        movieId: 105,

        watched: true,
        rating: 5,
    },
    {
        userId: new Types.ObjectId(),
        movieId: 115,

        watched: true,
        rating: 8,
    }
]

const getMovieLogs = async () => {
    const logs = await MovieLog.find({})
    return logs.map((log) => log.toJSON())
}

module.exports = {
    getMovieLogs,
    initialLogs
}