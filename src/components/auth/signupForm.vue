<template>
<v-container>
    <basic-alert />
    <v-row class="login-wrapper" align="center" justify="center">
      <v-col cols="10">
        <v-card outlined class="d-flex">
          <v-col cols="4">
            <v-row class="primary white--text py-12 px-6">
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
                  <h1 class="primary--text">Create account</h1>
                </v-col>
                <v-col cols="10">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-text-field
                      v-model="email"
                      :error-messages="emailErrors || errors.email"
                      dense
                      placeholder="yourname@company.com"
                      outlined
                      label="Email"
                    />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                      v-model="password"
                      :error-messages="passwordErrors || errors.password"
                      dense
                      type="password"
                      outlined
                      label="Password"
                    />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                      v-model="confirm_password"
                      :error-messages="confirmPasswordErrors"
                      dense
                      type="password"
                      outlined
                      label="Confirm Password"
                    />
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        @click="handleSignup"
                        :disabled="loginButtonDisabledStatus"
                        block
                        depressed
                        rounded
                        color="error"
                        medium
                      >
                        Create account
                      </v-btn>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <router-link class="blue--text text-decoration-none" :to="{ name: routes.login.name }">
                        {{ routes.login.label }}
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
import basicAlert from '../../components/alerts/basicAlert.vue'
import { signup } from '../../api/auth'
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  components: {
    basicAlert
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirm_password: {
      sameAs: sameAs('password')
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
        email: [],
        password: []
      },
      name: null,
      email: null,
      password: null,
      confirm_password: null
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
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return null
      }
      !this.$v.password.minLength && errors.push(validationMessage('Password', 'minLength', { size: 8 }))
      !this.$v.password.required && errors.push(validationMessage('Password', 'required'))
      this.setDisableStatus(true)
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return errors
      }
      !this.$v.confirm_password.sameAs && errors.push(validationMessage('Password confirmation', 'sameAs', { fieldName: 'password' }))
      this.setDisableStatus(true)
      return errors
    }
  },
  methods: {
    setDisableStatus (value) {
      this.loginButtonDisabledStatus = value
    },
    resetServerErrors () {
      this.errors.email = []
      this.errors.password = []
    },
    handleSignup () {
      this.$v.$touch()
      // if there are no errors
      if (!this.$v.$anyError) {
        signup(this.email, this.password).then((response) => {
          if (response.data.key) {
            this.email = null
            this.password = null
            this.confirm_password = null
            this.resetServerErrors()
            this.$v.$reset()
            this.$emit('fireAlert', { type: 'success', message: 'Successfully registered' })
            setTimeout(() => {
              this.$router.push({ name: 'dashboard-index' })
            }, 2000)
          }
        }).catch((error) => {
          console.log(error.response)
          if (error.response.data.email) {
            this.errors.email.push(error.response.data.email[0])
          }
          if (error.response.data.password) {
            this.errors.password.push(error.response.data.password[0])
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
