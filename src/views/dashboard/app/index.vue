<template>
  <v-container>
      <v-row class="my-8">
        <v-col>
          <span class="text-h4 font-weight-bold">All apps</span>
        </v-col>
        <v-spacer />
        <v-col class="text-right">
          <v-btn :to="{ name: 'dashboard-app-create' }" color="primary">
            Create app
          </v-btn>
        </v-col>
      </v-row>
      <index-table />
  </v-container>
</template>

<script>
import indexTable from '../../../components/dashboard/app/indexTable.vue'
export default {
  components: { indexTable }

}
</script>

<style>

</style>
