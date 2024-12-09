import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import '../styles/Pages/episode.sass'
import { CardCharacter } from '../Components/'
import { getEpisode, getMultipleCharacters } from '../services/getData'
import { alteredName } from '../utils'

const Episode = () => {
  const params = useParams()
  const location = useLocation()
  const [episode, setEpisode] = useState(null)
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (location.state) {
      setEpisode(location.state)
    } else {
      const episode = async () => {
        const { data } = await getEpisode(alteredName(params.name))
        setEpisode(data.results[0])
      }
      episode()
    }
  }, [location.state, params])

  useEffect(() => {
    if (episode) {
      const splitUrlCharacters = episode.characters.map((character) =>
        character.split('/')
      )

      const allUrlCharacters = splitUrlCharacters.map(
        (url) => url[url.length - 1]
      )

      const dataCharacters = async () => {
        const data = await getMultipleCharacters(allUrlCharacters)
        setCharacters(data)
        setIsLoading(true)
      }

      dataCharacters()
    }
  }, [episode])

  return (
    <div className="container">
      {episode && (
        <>
          <div className="name">
            <p>{episode.name}</p>
          </div>
          <div className="container-characters">
            <p>Characters</p>

            {characters &&
              characters.map((character) => (
                <CardCharacter
                  key={character.id}
                  character={character}
                  isLoading={isLoading}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Episode
