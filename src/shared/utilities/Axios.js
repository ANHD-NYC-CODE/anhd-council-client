import axios from 'axios'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: { 'Content-type': 'application/json' },
})
