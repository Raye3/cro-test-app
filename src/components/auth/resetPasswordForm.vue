<template>
<v-container>
    <basic-alert />
    <v-row class="login-wrapper" align="center" justify="center">
      <v-col cols="6">
        <v-card outlined>
            <v-row class="py-12 px-12" justify="center">
              <v-col cols="12" class="text-center">
                <img width="200" :src="require('@/assets/logo-dark.png')" />
                <span class="d-block">Build applications. Fast.</span>
                <p class="mt-6">Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors || errors.email"
                  outlined
                  label="Email"
                  dense
                  placeholder="yourname@company.com"
                />
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn
                  @click="handleResetPassword"
                  :disabled="loginButtonDisabledStatus"
                  block
                  depressed
                  rounded
                  color="blue"
                  class="white--text"
                  medium
                >
                  Reset password
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center">
                <span>
                  <router-link class="text-decoration-none blue--text" :to="{ name: routes.login.name }">
                    <v-icon color="blue">mdi-arrow-left-circle</v-icon>
                    <span>
                      {{ routes.login.label }}
                    </span>
                  </router-link>
                </span>
              </v-col>
            </v-row>
        </v-card>
      </v-col>
  </v-row>
</v-container>
</template>

<script>
import { validationMessage } from '../../helpers/validation'
import basicAlert from '../alerts/basicAlert.vue'
import { resetPassword } from '../../api/auth'
import { email, required } from 'vuelidate/lib/validators'
export default {
  components: {
    basicAlert
  },
  validations: {
    email: {
      email,
      required
    }
  },
  data () {
    return {
      routes: {
        login: {
          name: 'login',
          label: 'Login here'
        }
      },
      loginButtonDisabledStatus: false,

      errors: {
        email: []
      },
      email: null
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return null
      }
      !this.$v.email.email && errors.push(validationMessage('Email', 'email'))
      !this.$v.email.required && errors.push(validationMessage('Email', 'required'))
      this.setDisableStatus(true)
      return errors
    }
  },
  methods: {
    setDisableStatus (value) {
      this.loginButtonDisabledStatus = value
    },
    handleResetPassword () {
      this.$v.$touch()
      // if there are no errors
      if (!this.$v.$anyError) {
        resetPassword(this.email).then((response) => {
          console.log(response)
          if (response.data.detail) {
            this.email = null
            this.$v.$reset()
            this.$emit('fireAlert', { type: 'success', message: response.data.detail })
          }
        }).catch((error) => {
          if (error.response.data.email.email) {
            this.$emit('fireAlert', { message: error.response.data.email.email[0] })
          }
        })
      } else {
        // if there are errors
      }
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
}
</style>
