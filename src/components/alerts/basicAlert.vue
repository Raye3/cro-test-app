<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    :color="color"
    right
  >
    {{ message }}

    <template #action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      snackbar: false,
      message: null,
      color: 'error'
    }
  },
  created () {
    // for calls within parent
    this.$parent.$on('fireAlert', (payload) => {
      this.message = payload.message
      this.color = payload.type ?? 'error'
      this.snackbar = true
    })
  }
}
</script>

<style>

</style>
