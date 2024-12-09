import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './Button'
import '../styles/Components/navbar.sass'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { alteredName } from '../utils'

export const Navbar = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [, setSearchParams] = useSearchParams()
  const [menu, setMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  useEffect(() => {
    if (openSearch || menu) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [openSearch, menu])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search) {
      setSearchParams({ name: search, page: 1 })
      const restoreStringName = alteredName(search)
      navigate(`/search?&name=${restoreStringName}`)
    }
    setSearch('')
    setOpenSearch(false)
  }

  const getNavigate = (local) => {
    navigate(`/${local ? local : ''}`)
    setMenu(false)
  }

  const openSearchMenu = () => {
    setOpenSearch(true)
    setMenu(false)
  }

  return (
    <div
      className={
        openSearch ? 'container-navbar-open-search' : 'container-navbar'
      }
    >
      <h1>
        <Link to="/">RickAndMorty</Link>
      </h1>
      {menu ? (
        <div className="background-menu" onClick={() => setMenu(false)}>
          <div
            className={`menu ${menu ? 'menu-open' : 'menu-close'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="options-menu">
              <p onClick={() => getNavigate()}>Home</p>
              <p onClick={() => getNavigate('characters')}>Characters</p>
              <p onClick={() => getNavigate('localizations')}>Localizations</p>
              <p onClick={() => getNavigate('episodes')}>Episodes</p>
              <SearchIcon
                style={{ color: '#fff' }}
                onClick={() => openSearchMenu()}
              />
              <CloseIcon
                style={{ color: '#fff' }}
                onClick={() => setMenu(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {openSearch && (
            <div className="search-menu" onClick={() => setOpenSearch(false)}>
              <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="input-and-close">
                  <input
                    placeholder="Search a Character"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                  <CloseIcon
                    id="close-icon"
                    onClick={() => setOpenSearch(false)}
                  />
                </div>
                <Button text="Search" />
              </form>
            </div>
          )}

          <MenuIcon
            id="menu-icon"
            style={{ color: '#fff' }}
            onClick={() => setMenu(true)}
          />
        </>
      )}
    </div>
  )
}
