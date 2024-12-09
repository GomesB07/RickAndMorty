import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Pages/Home'
import Characters from './Pages/Characters'
import Character from './Pages/Character'
import Search from './Pages/Search'
import Localization from './Pages/Localization'
import Episodes from './Pages/Episodes'
import Episode from './Pages/Episode'
import Localizations from './Pages/Localizations'

const myRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:name" element={<Character />} />
          <Route path="/search" element={<Search />} />
          <Route path="/localization/:name" element={<Localization />} />
          <Route path="/Localizations" element={<Localizations />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episode/:name" element={<Episode />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default myRoutes
