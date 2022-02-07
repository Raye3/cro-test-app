import axios from '../plugins/axios'

export function createSubscription (planID, appID) {
  return axios.post('/api/v1/subscriptions/', {
    plan: planID,
    app: appID,
    active: true
  })
}

export function getSubscriptions () {
  return axios.get('/api/v1/subscriptions/')
}

export function getSubscriptionByID (subscriptionID) {
  return axios.get('/api/v1/subscriptions/' + subscriptionID)
}

export function updateSubscription (subscriptionID, data) {
  return axios.put('/api/v1/subscriptions/' + subscriptionID, {
    plan: data.planID,
    app: data.appID,
    active: true
  })
}
