import axios from 'axios'
import store from '../store/index'

axios.defaults.baseURL = 'https://hiring-example-25770.botics.co'

axios.interceptors.response.use(function (response) {
  /**
   * check if Key (auth token) exists in the response
   * if key exists means either succesfully logged in or the token has changed
   */
  if (response.data.key) {
    localStorage.setItem('auth_token', response.data.key)
    store.commit('refreshToken', response.data.key)
  }
  return response
})

axios.interceptors.request.use(function (request) {
  if (localStorage.getItem('auth_token')) {
    store.commit('refreshToken', localStorage.getItem('auth_token'))
    request.headers.authorization = store.getters.getToken
    return request
  }

  return request
})
export default axios
