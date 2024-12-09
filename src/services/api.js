import axios from 'axios'

const baseApi = import.meta.env.VITE_BASE_API

const api = axios.create({
  baseURL: baseApi,
})

export default api
