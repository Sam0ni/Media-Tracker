import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import Header from './components/Header'
import MovieDetails from './components/MovieDetails'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/movies/:id" element={<MovieDetails />}/>
      </Routes>
    </Router>
  )
}

export default App