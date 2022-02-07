<template>
  <v-container class="fill-height">
    <index-actions-cards />
  </v-container>
</template>

<script>
import IndexActionsCards from '@/components/dashboard/IndexActionsCards.vue'
export default {
  name: 'Home',
  components: {
    IndexActionsCards
  }
}
</script>

<style scoped>
.container {
  height: calc(100vh - 70px)
}
</style>
