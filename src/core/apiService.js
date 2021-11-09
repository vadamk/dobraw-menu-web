import axios from 'axios'

const apiService = axios.create({
  baseURL: "https://peaceful-beach-58186.herokuapp.com",
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=utf-8',
  },
})

export default apiService
