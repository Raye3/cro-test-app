<template>
      <v-app-bar
        app
        color="primary"
        dark
      >
      <v-toolbar-title>
        <router-link to="/">
          <v-img width="150" :src="require('@/assets/logo.png')"></v-img>
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <nav-bar-routes />

    </v-app-bar>
</template>

<script>
import NavBarRoutes from './navBarRoutes.vue'
export default {
  name: 'MainNavBar',
  components: {
    NavBarRoutes
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
