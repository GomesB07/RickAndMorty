import { useNavigate } from 'react-router-dom'
import '../styles/Components/cardCharacter.sass'
import { Skeleton, Stack } from '@mui/material'
import { alteredName } from '../utils/'

export const CardCharacter = ({ ...props }) => {
  const character = props.character
  const isLoading = props.isLoading
  const navigate = useNavigate()

  const characterNameUrl = alteredName(character.name)

  const goToCharacter = (character) => {
    navigate(`/character/${characterNameUrl}`, { state: character })
  }

  return isLoading ? (
    <div className="card-character" onClick={() => goToCharacter(character)}>
      <img src={character.image} alt={character.name} />

      <div className="character-informations">
        <h2>{character.name}</h2>
        <div className="information-status">
          <span
            className={`circle-status ${
              character.status === 'Alive'
                ? 'alive'
                : character.status === 'Dead'
                ? 'dead'
                : 'unknown'
            }`}
          />
          <h3>
            {character.status} - {character.species}
          </h3>
        </div>
        <div className="information-origin">
          <p>First see in:</p>
          <h3>{character.origin.name}</h3>
        </div>
      </div>
    </div>
  ) : (
    <Stack spacing={1} className="container-skeleton">
      <Skeleton
        className="skeleton-character"
        variant="rounded"
        animation="wave"
      />
    </Stack>
  )
}
