import axiosModule from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_API_ENDPOINT

const axios = axiosModule.create({
  baseURL: BASE_URL
})

export default axios
