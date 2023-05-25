import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import '../styles/search.sass'
import ContainerCharacters from '../Components/ContainerCharacters'
import CardCharacters from '../Components/CardCharacter'
const Search = () => {
  const location = useLocation()
  const search = location.state
  const url = import.meta.env.VITE_API_FILTER_CHARACTER
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCharacters = async () => {
      const response = await axios.get(`${url}${search}`)
      const results = response.data.results
      setCharacters(results)
      setTimeout(() => {
        setIsLoading(true)
      }, 1000)
    }
    getCharacters()
  }, [search])

  return characters.length > 0 ? (
    <div className="container-search">
      <h2 className="title-search">{search}</h2>
      <ContainerCharacters>
        {characters.map((character) => (
          <CardCharacters
            key={character.id}
            character={character}
            isLoading={isLoading}
          />
        ))}
      </ContainerCharacters>
    </div>
  ) : (
    <div className="container-search">
      <h2 className="title-search">Characters not found</h2>
    </div>
  )
}
export default Search
