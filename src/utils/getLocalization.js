export const getLocalization = async (location, navigate) => {
  if (location.name) {
    if (location.name.includes('-')) {
      const restoreName = alteredName(location.name)
      navigate(`/localization/${restoreName}`)
    } else {
      navigate(`/localization/${location.name}`)
    }
  }
}
