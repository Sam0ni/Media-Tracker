const User = require("../models/user")
const decodeToken = require("../services/token_service")

const userExtractor = async (req, res, next) => {
    try {
        const decodedToken = decodeToken(req)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' })
        }

        const user = await User.findById(decodedToken.id)

        if (!user) {
            return res.status(400).json({ error: 'UserId missing or not valid' })
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = userExtractor