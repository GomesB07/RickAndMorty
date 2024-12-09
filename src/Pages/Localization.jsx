import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLocalization, getMultipleCharacters } from '../services/getData'
import { CardCharacter } from '../Components'
import '../styles/Pages/localization.sass'
import { alteredName } from '../utils'

const Localization = () => {
  const [localization, setLocalization] = useState()
  const [residents, setResidents] = useState()
  const params = useParams()
  const localizationName = params.name

  useEffect(() => {
    const getLocation = async () => {
      const localizationAlteredName = alteredName(localizationName)
      const data = await getLocalization(localizationAlteredName)
      setLocalization(data.data.results[0])
    }
    getLocation()
  }, [location])

  useEffect(() => {
    if (localization) {
      const residentUrl = localization.residents.map((resident) =>
        resident.split('/')
      )
      const residentsId = residentUrl.map(
        (resident) => resident[resident.length - 1]
      )

      const getResidents = async () => {
        const data = await getMultipleCharacters(residentsId)
        setResidents(data)
        console.log(data)
      }
      getResidents()
    }
  }, [localization])

  return (
    <>
      <div className="container">
        {localization && (
          <div className="container-specifications">
            <div className="subcontainer-specifications">
              <div className="name-id">
                <h1>{localization.name}</h1>
                <p>
                  <span>Id</span> {localization.id}
                </p>
              </div>

              {localization.type && (
                <div className="type">
                  <label>Type:</label>
                  <p>{localization.type}</p>
                </div>
              )}

              {localization.dimension && (
                <div className="dimension">
                  <label>Dimension:</label>
                  <p>{localization.dimension}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="container-residents">
          <h2>Residents</h2>

          <div className="subcontainer-residents">
            {residents &&
              residents.map((resident) => (
                <CardCharacter
                  key={resident.id}
                  character={resident}
                  isLoading={true}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Localization
