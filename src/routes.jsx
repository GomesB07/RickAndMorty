import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'
import Characters from './Pages/Characters'
import Character from './Pages/Character'
import Search from './Pages/Search'

const myRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character" element={<Character />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default myRoutes
