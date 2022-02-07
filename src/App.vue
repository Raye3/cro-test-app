<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { getUser } from './api/auth'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  created () {
    // console.log('from parent')
    if (localStorage.getItem('auth_token')) {
      getUser().then((response) => {
        if (response.data.username) {
          this.$store.commit('setUser', response.data)
        }
      })
    }
  }
}
</script>
