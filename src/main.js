import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import { VueSweetalert2, sweetalertOptions } from './plugins/sweetAlert'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueSweetalert2, sweetalertOptions)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
