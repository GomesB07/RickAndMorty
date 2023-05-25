import { useEffect, useState } from 'react'
import axios from 'axios'
import Banner from '../assets/BannerRickAndMorty.jpeg'

import ContainerCharacters from '../Components/ContainerCharacters'
import CardCharacter from '../Components/CardCharacter'
const Home = () => {
  const api = import.meta.env.VITE_API_SINGLE_CHARACTER
  const [fourNumbers, setFourNumbers] = useState([])
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getNumbers = (min, max, count) => {
      const numbers = []
      while (numbers.length < count) {
        const number = Math.floor(Math.random() * (max - min) + min)
        if (!numbers.includes(number)) {
          numbers.push(number)
        }
      }
      setFourNumbers(numbers)
    }
    getNumbers(1, 826, 4)
  }, [])

  useEffect(() => {
    const getCharacters = async () => {
      const response = await Promise.all(
        fourNumbers.map((number) => axios.get(`${api}${number}`))
      )
      const data = response.map((res) => res.data)
      setCharacters(data)
      setTimeout(() => {
        setIsLoading(true)
      }, 2000)
    }
    getCharacters()
  }, [fourNumbers])

  return (
    <>
      <img style={{ width: '100%' }} src={Banner} alt="Banner Rick And Morty" />
      <ContainerCharacters>
        {characters.map((character) => (
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
