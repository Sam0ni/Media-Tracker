import { useState } from "react"
import axios from "axios"
import { login } from "./services/user"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sendLogin = event => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }

    console.log(login(credentials))
  }

  return (
    <form onSubmit={sendLogin}>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  )
}

const App = () => {
  return (
    <div>
      <p>Hello world</p>

      <LoginForm/>
    </div>
  )
}

export default App