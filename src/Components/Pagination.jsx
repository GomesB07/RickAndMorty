import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function BasicPagination({ ...props }) {
  console.log(props)

  const handleChange = (p) => {
    const getNextPage = async () => {
      await axios
        .get(
          `https://rickandmortyapi.com/api/character/?page=${p}&name=${search}`
        )
        .then((response) => {
          const results = response.data.results
          setCharacters(results)
        })
    }
    getNextPage()
    setAtualPage(p)
    console.log(p)
    console.log(characters)
  }
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="primary" />
    </Stack>
  )
}
