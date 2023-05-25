import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ErrorIcon from '../assets/mortyIcon.svg'
import '../styles/search.sass'
import ContainerCharacters from '../Components/ContainerCharacters'
import CardCharacters from '../Components/CardCharacter'
import { Pagination } from '@mui/material'
const Search = () => {
  const location = useLocation()
  const search = location.state
  const url = import.meta.env.VITE_API_FILTER_CHARACTER
  const [characters, setCharacters] = useState([])
  const [infos, setInfos] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getCharacters = async () => {
      await axios
        .get(`${url}${search}`)
        .then((response) => {
          setError('')
          const results = response.data.results
          setCharacters(results)
          const infos = response.data.info
          setInfos(infos)
        })
        .catch((error) => {
          setError(error.response.data)
        })
    }
    getCharacters()
  }, [search])

  setTimeout(() => {
    setIsLoading(true)
  }, 1000)

  return error.length === 0 ? (
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
      <Pagination pages={infos.pages} />
    </div>
  ) : (
    <div className="container-search">
      <h2 className="title-search">Characters not found</h2>
      <img className="error-icon" src={ErrorIcon} alt="Error Icon" />
    </div>
  )
}
export default Search
