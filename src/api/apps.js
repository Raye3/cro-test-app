import axios from '../plugins/axios'

export function createApp (data) {
  return axios.post('api/v1/apps/', {
    ...data
  })
}

export function getApps () {
  return axios.get('api/v1/apps/')
}

export function getAppByID (appID) {
  return axios.get('/api/v1/apps/' + appID)
}

export function deleteApp (appID) {
  return axios.delete('/api/v1/apps/' + appID)
}

export function updateApp (appID, data) {
  return axios.put('/api/v1/apps/' + appID,
    {
      ...data
    }
  )
}
