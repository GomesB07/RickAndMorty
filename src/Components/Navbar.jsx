import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Components/navbar.sass'

const Navbar = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(search)
    search.length > 0 && navigate('/search', { state: search })
    setSearch('')
  }

  return (
    <div className="container-navbar">
      <h1>
        <Link to="/">RickAndMorty</Link>
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search a Character"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button>Search</button>
      </form>
    </div>
  )
}
export default Navbar
