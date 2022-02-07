<template>
<v-container>
  <basic-alert />
    <v-row class="login-wrapper" align="center" justify="center">
      <v-col cols="10">
        <v-card outlined class="d-flex">
          <v-col cols="4">
            <v-row class="text-caption primary white--text py-12 px-6">
              <v-col cols="12" class="text-center">
                <img width="200" :src="require('@/assets/logo.png')" />
                <span class="d-block">Build applications. Fast.</span>
              </v-col>
              <v-col cols="12" class="text-center">
                <p>Crowdbotics is the easiest way to build software applications, trusted by hundreds of teams. Sign up to start building your application.</p>
              </v-col>
              <v-col cols="12">
                <span><v-icon color="white">mdi-rocket</v-icon></span>
                <span>Get a working app in minutes. Choose an app type and we'll generate and launch it for you. Mobile, web, chatbots, blockchain and more.</span>
              </v-col>
              <v-col cols="12">
                <span><v-icon color="white">mdi-rocket</v-icon></span>
                <span>Get a working app in minutes. Choose an app type and we'll generate and launch it for you. Mobile, web, chatbots, blockchain and more.</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="8" class="d-flex flex-column justify-center align--center">
            <div>
              <v-row justify="center">
                <v-col cols="10" class="text-center">
                  <h1 class="text-h6 primary--text font-weight-bold">Login to Dashboard</h1>
                </v-col>
                <v-col cols="10">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        dense
                        outlined
                        label="Email"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        dense
                        type="password"
                        outlined
                        label="Password"
                      />
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <router-link
                        class="blue--text text-decoration-none"
                        :to="{ name: routes.forgetPassword.name }"
                      >
                        {{ routes.forgetPassword.label }}
                      </router-link>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        :disabled="loginButtonDisabledStatus"
                        @click="handleLogin"
                        block
                        depressed
                        rounded
                        color="error"
                        medium
                      >
                        Login
                      </v-btn>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <router-link
                        class="blue--text text-decoration-none"
                        :to="{ name: routes.signup.name }"
                      >
                        {{ routes.signup.label }}
                      </router-link>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-card>
      </v-col>
  </v-row>
</v-container>
</template>

<script>
import { validationMessage } from '../../helpers/validation'
import BasicAlert from '@/components/alerts/basicAlert'
import { login, getUser } from '../../api/auth'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    BasicAlert
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  data () {
    return {
      routes: {
        forgetPassword: {
          name: 'reset-password',
          label: 'Forget password ?'
        },
        signup: {
          name: 'signup',
          label: 'Register Now'
        }
      },

      email: null,
      password: null,

      errors: {
        email: [],
        password: []
      },

      loginButtonDisabledStatus: false
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return errors
      }
      !this.$v.email.email && errors.push(validationMessage('Email', 'email'))
      !this.$v.email.required && errors.push(validationMessage('Email', 'required'))
      this.setDisableStatus(true)
      return errors
    },
    passwordErrors: {
      get () {
        const errors = []
        if (!this.$v.$anyError) {
          this.setDisableStatus(false)
          return errors
        }
        !this.$v.password.minLength && errors.push(validationMessage('Password', 'minLength', { size: 8 }))
        !this.$v.password.required && errors.push(validationMessage('Password', 'required'))
        this.setDisableStatus(true)
        return errors
      },
      set (newValue) {
        this.errors.password = []
        this.errors.password.push(newValue)
      }
    }
  },
  methods: {
    setDisableStatus (value) {
      this.loginButtonDisabledStatus = value
    },
    handleLogin () {
      this.$v.$touch()
      // check if there's no validation error
      if (!this.$v.$anyError) {
        login(this.email, this.password).then((response) => {
          // if logged in sucessfully
          if (response.data.key) {
            getUser().then((response) => {
              if (response.data.username) {
                this.$store.commit('setUser', response.data)
                this.$router.push({ name: 'dashboard-index' })
              }
            })
          }
        }).catch((error) => {
          console.log(error)
          if (error.response.data.non_field_errors) {
            this.$emit('fireAlert', { message: error.response.data.non_field_errors[0] })
          }
          if (error.response.data.password) {
            this.$emit('fireAlert', { message: 'Password field is required' })
          }
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
}
</style>
