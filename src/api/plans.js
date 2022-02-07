import axios from '../plugins/axios'

export function getPlans () {
  return axios.get('/api/v1/plans/')
}

export function getPlanByID (planID) {
  return axios.get('/api/v1/plans/' + planID)
}
