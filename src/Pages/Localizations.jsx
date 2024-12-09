import { useEffect, useState } from 'react'
import { getAllLocalizations } from '../services/getData'
import '../styles/Pages/localizations.sass'
import { PaginationButtons } from '../Components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { alteredName } from '../utils'

const Localizations = () => {
  const [allLocalizations, setAllLocalizations] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPage, setMaxPage] = useState()
  const navigate = useNavigate()

  const activePage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchLocalizations = async () => {
      const { data } = await getAllLocalizations(activePage)
      setAllLocalizations(data.results)
      setMaxPage(data.info.pages)
    }

    fetchLocalizations()
  }, [activePage])

  const handlePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const goLocalization = (localization) => {
    const alteredNameLocalization = alteredName(localization.name)
    navigate(`/localization/${alteredNameLocalization}`)
  }

  return (
    <div className="container">
      <h2>Localizations</h2>

      <div className="localizations">
        {allLocalizations &&
          allLocalizations.map((local) => (
            <p key={local.id} onClick={() => goLocalization(local)}>
              {local.name}
            </p>
          ))}
      </div>

      <PaginationButtons
        pageChange={handlePage}
        maxPage={maxPage}
        activePage={activePage}
      />
    </div>
  )
}

export default Localizations
