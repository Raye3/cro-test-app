<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-transition"
  >
      <v-card class="pt-6">
          <div class="text-center">
            <v-progress-circular v-if="loading" size="80" indeterminate color="primary"></v-progress-circular>
          </div>
        <v-card-text>
          <v-row>
              <v-col v-for="(plan, index) in plansList" :key="index">
                  <v-card outlined class="px-0">
                      <v-card-title>
                        <div class="d-flex align-center">
                            <v-icon class="primary--text" x-large>mdi-rocket</v-icon>
                            <h1 class="d-inline primary--text">
                                {{ plan.name }}
                            </h1>
                        </div>
                      </v-card-title>
                      <v-card-text>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam quis est officiis quasi iste enim vitae beatae earum, voluptatum sit facilis illum accusantium expedita animi doloremque similique provident officia vero?</p>
                          <v-divider />
                          <h1 class="text-center mt-6">
                              {{ plan.price }} $
                          </h1>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="updateAppSubscription(plan.id)" color="primary" block>Select</v-btn>
                      </v-card-actions>
                  </v-card>
              </v-col>
          </v-row>
        </v-card-text>
      </v-card>

  </v-dialog>
</template>

<script>
import { getPlans } from '@/api/plans'
import { getAppByID } from '../../../api/apps'
import { createSubscription, updateSubscription } from '../../../api/subscriptions'
export default {
  data () {
    return {
      dialog: false,
      plansList: [],
      loading: true
    }
  },
  methods: {
    updateAppSubscription (planID) {
      const appID = this.$route.params.id
      getAppByID(appID).then((response) => {
        if (response.data.subscription) {
          updateSubscription(response.data.subscription, {
            planID,
            appID
          }).then(() => {
            this.$swal({
              text: 'App subscription Updated successfully',
              icon: 'success'
            }).then(() => {
              this.$parent.$emit('updateSubscriptionStatus')
            })
          })
        } else {
          createSubscription(planID, appID).then((response) => {
            this.$swal({
              text: 'App subscription Updated successfully',
              icon: 'success'
            }).then(() => {
              this.$parent.$emit('updateSubscriptionStatus')
            })
          })
        }
      })
    }
  },
  created () {
    this.$parent.$on('subscriptionModalShow', () => {
      this.dialog = true
    })
  },
  mounted () {
    getPlans().then((response) => {
      this.loading = false
      this.plansList = response.data
    })
  }
}
</script>

<style>

</style>
