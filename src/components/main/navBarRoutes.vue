<template>
  <div>
    <v-menu
      v-for="(accountRoutes, index) in routes.account"
      :key="index"
      offset-y
      center
      nudge-left="5"
      nudge-bottom="10"
      tile
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="mx-2"
          color="white"
          outlined
          small
          tile
        >
          <v-icon>
            {{ accountRoutes.icon }}
          </v-icon>
          {{ accountRoutes.label }}
        </v-btn>
      </template>
      <v-list outlined tile>
        <v-list-item>
          <v-list-item-title class="text-center">
            <v-btn color="error" @click="logout">Logout</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { clearAuthTokenStorage, logout } from '../../api/auth'
export default {
  data () {
    return {
      routes: {
        account: [
          {
            name: '/',
            label: 'Account',
            icon: 'mdi-account'
          }
        ]
      }
    }
  },
  methods: {
    logout () {
      logout().then(() => {
        clearAuthTokenStorage()
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style>
</style>
