import { useState } from "react"
import auth from "../services/user"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sendLogin = event => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }
    user = auth.login(credentials)
    console.log(user)

    window.localStorage.setItem(
      "loggedMediaTrackerUser", JSON.stringify(user)
    )
  }

  return (
    <form onSubmit={sendLogin}>
      <div>
        <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm