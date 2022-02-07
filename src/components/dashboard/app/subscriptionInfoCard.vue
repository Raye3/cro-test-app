<template>
  <v-row>
      <subscription-update-modal />
      <v-col cols="12">
        <h1 class="primary--text text-center">Subscription info</h1>
      </v-col>
      <v-col cols="12" class="text-center">
        Current Subscription
        <v-progress-circular class="ms-3" v-if="loading" size="30" indeterminate color="primary"></v-progress-circular>
        <span v-else class="error--text font-weight-bold">{{ currentSubscription }}</span>
      </v-col>
      <v-col cols="12">
          <v-btn @click="showSubscriptionModal" color="primary" block>
              change Plan
          </v-btn>
      </v-col>
  </v-row>
</template>

<script>
import { getSubscriptionByID } from '../../../api/subscriptions'
import { getPlanByID } from '../../../api/plans'
import { getAppByID } from '../../../api/apps'
import subscriptionUpdateModal from './subscriptionUpdateModal.vue'
export default {
  components: { subscriptionUpdateModal },
  data () {
    return {
      subscriptionType: null,
      loading: true
    }
  },
  computed: {
    currentSubscription: {
      get () {
        return this.subscriptionType ?? 'Not yet subscribed'
      },
      set (newValue) {
        this.subscriptionType = newValue
      }
    }
  },
  methods: {
    showSubscriptionModal () {
      this.$emit('subscriptionModalShow')
    },
    async getAppPlan () {
      const appID = this.$route.params.id
      await getAppByID(appID).then((response) => {
        // if this app got a subscription
        if (response.data.subscription) {
          // get the app subscription
          getSubscriptionByID(response.data.subscription).then((response) => {
            if (response.data.plan) {
              // get the subscription plan
              getPlanByID(response.data.plan).then((response) => {
                this.loading = false
                this.subscriptionType = response.data.description
              })
            }
          })
        } else {
          this.loading = false
        }
      })
    }
  },
  mounted () {
    this.getAppPlan()
    this.$on('updateSubscriptionStatus', () => {
      this.getAppPlan()
    })
  }
}
</script>

<style>

</style>
