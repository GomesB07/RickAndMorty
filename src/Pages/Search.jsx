import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ErrorIcon from '../assets/mortyIcon.svg'
import '../styles/Pages/search.sass'
import {
  ContainerCharacters,
  CardCharacter,
  PaginationButtons,
} from '../Components'
import { getCharacter } from '../services/getData'
import { alteredName } from '../utils'

const Search = () => {
  const [searchName, setSearchName] = useState()
  const [characters, setCharacters] = useState([])
  const [infos, setInfos] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [altered, setAltered] = useState()
  const [oldName, setOldName] = useState()
  const location = useLocation()

  useEffect(() => {
    const nameParam = searchParams.get('name')
    const pageParam = searchParams.get('page')

    setSearchName(nameParam || '')
    setAltered(alteredName(nameParam || ''))

    if (nameParam !== oldName) {
      setPage(1)
      setOldName(nameParam)
      setSearchParams({ name: nameParam })
    } else if (pageParam) {
      setPage(parseInt(pageParam, 10))
    }
  }, [searchParams])

  useEffect(() => {
    if (location.state) {
      setCharacters(location.state.results)
    } else {
      const fetchCharacters = async () => {
        if (altered) {
          try {
            const response = await getCharacter(altered, page)
            setError('')
            setCharacters(response.data.results)
            setInfos(response.data.info)
            setIsLoading(true)
          } catch (error) {
            setError(error.response?.data || 'An error occurred')
          }
        }
      }
      fetchCharacters()
    }
  }, [altered, page, location.state])

  const handlePage = (newPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPage(newPage)
    setSearchParams({ name: searchName, page: newPage })
  }

  return error.length === 0 ? (
    <div className="container-search">
      <h2 className="title-search">{altered}</h2>
      <ContainerCharacters>
        {characters.map((character) => (
          <CardCharacter
            key={character.id}
            character={character}
            isLoading={isLoading}
          />
        ))}
      </ContainerCharacters>

      {infos.pages !== 1 && (
        <PaginationButtons maxPage={infos.pages} pageChange={handlePage} />
      )}
    </div>
  ) : (
    <div className="container-search">
      <h2 className="title-search">Characters not found</h2>
      <img className="error-icon" src={ErrorIcon} alt="Error Icon" />
    </div>
  )
}
export default Search
