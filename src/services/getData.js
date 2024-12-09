import api from './api'

export const getCharacter = async (name, page) => {
  const data = await api.get(`character?page=${page}&name=${name}`)
  return data
}

export const getMultipleCharacters = async (numbers) => {
  const { data } = await api.get(`character/${numbers}`)
  return data
}

export const getCharacters = async (page) => {
  const { data } = await api.get(`character/?page=${page}`)
  return data
}

export const getLocalization = async (name) => {
  const data = await api.get(`location?name=${name}`)
  return data
}

export const getAllLocalizations = async (page) => {
  return await api.get(`/location?page=${page}`)
}

export const getEpisode = async (ep) => {
  if (typeof ep === 'number') {
    return await api.get(`episode/${ep}`)
  } else {
    return await api.get(`episode?name=${ep}`)
  }
}

export const getAllEpisodes = async (page) => {
  const data = await api.get(`episode?page=${page}`)
  return data
}
