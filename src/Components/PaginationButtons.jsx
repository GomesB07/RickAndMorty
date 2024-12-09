import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import '../styles/Components/pagination.sass'
import { useEffect, useState } from 'react'

export const PaginationButtons = ({ pageChange, maxPage, activePage }) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (activePage !== page) {
      setPage(activePage)
    }
  }, [activePage, page])

  const handleChange = (event, value) => {
    setPage(value)
    pageChange(value)
  }

  return (
    <div className="container-pagination">
      <Stack spacing={2}>
        <Pagination
          className="buttons"
          count={maxPage}
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  )
}
