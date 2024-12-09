import { useEffect, useState } from 'react'
import Banner from '../assets/BannerRickAndMorty.jpeg'
import { getMultipleCharacters } from '../services/getData'

import { ContainerCharacters, CardCharacter } from '../Components'
import { getRandomNumbers } from '../utils/'

const Home = () => {
  const [randomNumbers, setRandomNumbers] = useState([])
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getNumbers = getRandomNumbers(4)
    setRandomNumbers(getNumbers)
  }, [])

  useEffect(() => {
    const getCharacters = async () => {
      if (randomNumbers && randomNumbers.length > 0) {
        const data = await getMultipleCharacters(randomNumbers)
        console.log(data)
        setCharacters(data)
        setTimeout(() => {
          setIsLoading(true)
        }, 1000)
      }
    }
    getCharacters()
  }, [randomNumbers])

  return (
    <>
      <img style={{ width: '100%' }} src={Banner} alt="Banner Rick And Morty" />
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
    </>
  )
}
export default Home
