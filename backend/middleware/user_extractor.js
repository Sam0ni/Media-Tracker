const User = require("../models/user")
const { decodeToken } = require("../services/token_service")

const userExtractor = async (req, res, next) => {
    try {
        const decodedToken = decodeToken(req)

        const user = await User.findById(decodedToken.id)

        if (!user) {
            const error = new Error('User not found')
            error.name = 'UserNotFoundError'
            throw error
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = userExtractor