const jwt = require("jsonwebtoken")

const parseTokenFromReq = req => {
    const auth = req.get("authorization")
    if (auth && auth.startsWith("Bearer ")) {
        return auth.replace("Bearer ", "")
    }
    return null
}

const create_token = (username, id) => {
    const userForToken = {
            username: username,
            id: id
        }
    
    const token = jwt.sign(userForToken, process.env.SECRET)

    return token
}

const decodeToken = req => {
    const decodedToken = jwt.verify(parseTokenFromReq(req), process.env.SECRET)
    return decodedToken
}

module.exports = create_token