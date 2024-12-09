import { getCharacters } from '../services/getData'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ContainerCharacters,
  CardCharacter,
  PaginationButtons,
} from '../Components'
import '../styles/Pages/characters.sass'

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [characters, setCharacters] = useState()
  const [maxPage, setMaxPage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const activePage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const getAllCharacters = async () => {
      const data = await getCharacters(activePage)
      setCharacters(data.results)
      setMaxPage(data.info.pages)
      setIsLoading(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    getAllCharacters()
  }, [activePage])

  const handlePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  return (
    <>
      <h1 className="title">Characters</h1>

      <ContainerCharacters>
        {characters &&
          characters.map((character) => (
            <CardCharacter
              key={character.id}
              character={character}
              isLoading={isLoading}
            />
          ))}
      </ContainerCharacters>

      <PaginationButtons
        pageChange={handlePage}
        maxPage={maxPage}
        activePage={activePage}
      />
    </>
  )
}
export default Characters
