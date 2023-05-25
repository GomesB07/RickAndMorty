import '../styles/Components/cardCharacter.sass'
import { Skeleton } from '@mui/material'

const CardCharacter = ({ ...props }) => {
  const character = props.character
  const isLoading = props.isLoading
  return isLoading ? (
    <div className="card-character">
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
    <Skeleton
      sx={{ bgcolor: '#1c1c1c', minWidth: '500px' }}
      variant="rounded"
      animation="wave"
      width={'40%'}
      height={'250px'}
    />
  )
}
export default CardCharacter
