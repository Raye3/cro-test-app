import axios from '../plugins/axios'

/**
 * Login method
 */
export function login (email, password) {
  return axios.post('/rest-auth/login/', {
    email: email,
    password: password
  })
}

/**
 * Signup method
 */
export function signup (email, password) {
  return axios.post('/rest-auth/registration/', {
    email,
    password
  })
}

export function getUser () {
  return axios.get('/rest-auth/user/')
}

export function clearAuthTokenStorage () {
  return localStorage.removeItem('auth_token')
}
export function logout () {
  return axios.post('/rest-auth/logout/')
}

export function resetPassword (email) {
  return axios.post('/rest-auth/password/reset/', {
    email
  })
}
