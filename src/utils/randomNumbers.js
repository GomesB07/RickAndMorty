export const getRandomNumbers = (count) => {
  const max = 826
  const min = 1
  const numbers = []
  while (numbers.length < count) {
    const number = Math.floor(Math.random() * (max - min) + min)
    if (!numbers.includes(number)) {
      numbers.push(number)
    }
  }
  return numbers
}
