<template>
  <v-container>
    <v-row class="flex-column-reverse flex-md-row">
      <v-col cols="12" md="8">
        <app-show-form />
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="py-8 px-6" outlined>
          <subscription-info-card />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import appShowForm from '../../../components/dashboard/app/showForm'
import subscriptionInfoCard from '../../../components/dashboard/app/subscriptionInfoCard'
export default {
  components: {
    appShowForm,
    subscriptionInfoCard
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
