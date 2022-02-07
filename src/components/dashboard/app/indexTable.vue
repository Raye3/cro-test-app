<template>
<div>
    <v-data-table
        :headers="headers"
        :items="appsList"
        :loading="loading"
        hide-default-footer
    >
    <template #[`item.action`]="{ item }">
        <v-btn title="view app" x-small outlined fab :to="{ name: 'dashboard-app-show', params: {id: item.id} }" color="success">
            <v-icon>mdi-eye</v-icon>
        </v-btn>
    </template>
    </v-data-table>
</div>
</template>

<script>
import { getApps } from '../../../api/apps'
export default {
  data () {
    return {
      headers: [
        { text: 'App name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Framework', value: 'framework' },
        { text: 'Actions', value: 'action' }
      ],
      appsList: [],
      loading: true
    }
  },
  methods: {
    te () {
      this.$nextTick(() => {})
    }
  },
  mounted () {
    getApps().then((response) => {
      this.loading = false
      this.appsList = response.data
    })
    this.te()
  }
}
</script>

<style>

</style>
