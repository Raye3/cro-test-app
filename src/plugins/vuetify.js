import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1e0a45',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#ea5f57'
      }
    }
  }
})
