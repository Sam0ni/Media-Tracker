import axios from "axios"


const sendCredentials = async (credentials, url) => {
    const res = await axios.post(url, credentials)
    return res.data
}

const register = async credentials => {
    return await sendCredentials(credentials, "http://localhost:3001/api/users")
}

const login = async credentials => {
    return await sendCredentials(credentials, "http://localhost:3001/api/login")
}

export default { login, register }