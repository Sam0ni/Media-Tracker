import { useState } from "react"
import axios from "axios"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sendLogin = event => {
    event.preventDefault()
    const credentials = {
      username,
      password
    }

    axios
      .post("http://localhost:3001/login", credentials)
      .then(res => {
        console.log(res)
      })
  }

  return (
    <form onSubmit={sendLogin}>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
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