import { useEffect, useState } from 'react'
import { getAllEpisodes } from '../services/getData'
import { PaginationButtons } from '../Components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/Pages/episodes.sass'
import { alteredName } from '../utils'

const Episodes = () => {
  const [episodes, setEpisodes] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const activePage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const getDataEpisodes = async () => {
      const { data } = await getAllEpisodes(activePage)
      setEpisodes(data.results)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    getDataEpisodes()
  }, [activePage])

  const handlePage = (newPage) => {
    setSearchParams({ page: newPage })
  }

  const goToEpisode = (episode) => {
    const alteredNameEpisode = alteredName(episode.name)
    navigate(`/episode/${alteredNameEpisode}`)
  }

  return (
    <div className="container">
      <h2>Episodes</h2>
      <div className="episodes">
        {episodes &&
          episodes.map((episode) => (
            <div
              className="episode"
              key={episode.id}
              onClick={() => goToEpisode(episode)}
            >
              <p style={{ color: '#fff' }}>{episode.name}</p>
            </div>
          ))}
      </div>

      <div className="pagination">
        <PaginationButtons
          pageChange={handlePage}
          maxPage={3}
          activePage={activePage}
        />
      </div>
    </div>
  )
}

export default Episodes
