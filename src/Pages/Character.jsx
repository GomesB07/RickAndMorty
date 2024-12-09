import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import {
  getCharacter,
  getEpisode,
  getMultipleCharacters,
} from '../services/getData'
import '../styles/Pages/character.sass'
import { CardCharacter } from '../Components'
import { getRandomNumbers, getLocalization } from '../utils'
import { Skeleton, Stack } from '@mui/material'
import { alteredName } from '../utils/'

const Character = () => {
  const [character, setCharacter] = useState()
  const [moreCharacters, setMoreCharacters] = useState()
  const [episode, setEpisode] = useState()
  const [randomNumbers, setRandomNumbers] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state) {
      setCharacter(location.state)
      setIsLoading(true)
    } else {
      const restoreName = alteredName(params.name)
      const fetchCharacter = async () => {
        const { data } = await getCharacter(restoreName)
        if (data.results.length > 1) {
          navigate(`/search?name=${params.name}`, {
            state: data,
          })
        }
        setCharacter(data.results[0])
        setIsLoading(true)
      }

      fetchCharacter()
    }
  }, [params, location])

  useEffect(() => {
    if (character) {
      const episodeNumber = character.episode.map((ep) => ep.split('/'))
      setEpisode(episodeNumber.map((epNumber) => epNumber[epNumber.length - 1]))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [character])

  useEffect(() => {
    const getNumbers = getRandomNumbers(20)
    setRandomNumbers(getNumbers)
  }, [])

  useEffect(() => {
    const fetchCharacters = async () => {
      if (randomNumbers && randomNumbers.length > 0) {
        const data = await getMultipleCharacters(randomNumbers)
        setMoreCharacters(data)
      }
    }
    fetchCharacters()
  }, [randomNumbers])

  const navigateEpisode = async (ep) => {
    const { data } = await getEpisode(ep)
    const newName = alteredName(data.name)

    navigate(`/episode/${newName}`, { state: data })
  }

  return (
    <div className="container">
      {character && isLoading ? (
        <div className="container-name-image-specifications">
          <div className="container-name-image">
            <img src={character.image} />
            <h1>{character.name}</h1>
          </div>

          <div className="container-specifications">
            <div className="subcontainer-specifications">
              <div className="id">
                <p>
                  <span>Id</span> {character.id}
                </p>
              </div>

              <div className="specie-gender">
                <p>
                  {character.species} - {character.gender}
                </p>
              </div>

              {character.type && (
                <div className="type">
                  <label>Type:</label>
                  <p>{character.type}</p>
                </div>
              )}

              <div className="origin">
                <label>Origin:</label>
                <p
                  className="p-link"
                  onClick={() => getLocalization(character.origin, navigate)}
                >
                  {character.origin.name}
                </p>
              </div>

              <div className="first-see">
                <label>First see in:</label>
                <p
                  className="p-link"
                  onClick={() => getLocalization(character.location, navigate)}
                >
                  {character.location.name}
                </p>
              </div>
              <div className="status">
                <span
                  className={`circle-status ${character.status.toLowerCase()}`}
                />
                <p>{character.status}</p>
              </div>

              {episode && (
                <div className="episode-container">
                  <span>Episodes:</span>
                  <div className="subcontainer-episode">
                    {episode.map((ep) => (
                      <div
                        key={ep}
                        className="episode"
                        onClick={() => navigateEpisode(Number(ep))}
                      >
                        <p>{ep}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Stack spacing={1} className="stack-skeleton">
          <Skeleton animation="wave" variant="rounded" className="skeleton" />
          <Skeleton animation="wave" variant="rounded" className="skeleton" />
        </Stack>
      )}

      <div className="container-more-characters">
        <h2>More Characters</h2>

        <div className="subcontainer-more-characters">
          {moreCharacters &&
            moreCharacters.map((character) => (
              <CardCharacter
                key={character.id}
                character={character}
                isLoading={true}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
export default Character
