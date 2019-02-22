import axios from 'axios'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: { 'Content-type': 'application/json' },
})

export const constructAxiosGet = (url, params, access_token) => {
  console.log(url)
  return Axios.get(url, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
}
