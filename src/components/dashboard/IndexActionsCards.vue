<template>
  <v-row>
    <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="12" md="4">
      <router-link class="text-decoration-none" :to=" {name: card.to} ">
        <v-card outlined class="py-6 fill-height">
          <v-row>
            <v-col cols="12" class="text-center primary--text">
              <v-icon x-large color="primary">
                  {{ card.icon }}
              </v-icon>
              <h2>
                  {{ card.title }}
              </h2>
              <p class="mb-0">
                {{ card.description }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      cards: [
        {
          icon: 'mdi-rocket-launch',
          title: 'Apps',
          description: 'Scaffold and deploy a working app in just a few minutes',
          to: 'dashboard-app-index'
        },
        {
          icon: 'mdi-rocket-launch',
          title: 'Get an Estimate',
          description: 'Estimate costs and timeline for your custom app.',
          to: '/'
        },
        {
          icon: 'mdi-rocket-launch',
          title: 'Hire Developers',
          description: 'Request additional help to build your app.',
          to: '/'
        }
      ]
    }
  }
}
</script>

<style>
</style>
