import axios, { AxiosError, AxiosResponse } from 'axios'

axios.defaults.withCredentials = true
// axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.baseURL = '/api/v1'

const responseBody = (response) => response.data

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
  postForm: (url, data) =>
    axios
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  putForm: (url, data) =>
    axios
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
}

const programmes = {
  getProgrammes: () => requests.get('/programme'),
}

const agent = {
  programmes,
}

export default agent