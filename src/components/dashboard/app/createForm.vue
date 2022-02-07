<template>
    <v-row class="my-12" justify="center">
      <basic-alert />
      <v-col cols="8">
        <h1 class="primary--text">App name info</h1>
      </v-col>
      <v-col cols="8">
        <v-text-field
          color="primary"
          v-model="title"
          :error-messages="titleErrors"
          outlined
          dense
          label="App title"
        />
      </v-col>
      <v-col cols="8">
        <v-textarea
          v-model="description"
          color="primary"
          outlined
          dense
          label="App Description"
        />
      </v-col>
      <v-col cols="8">
        <v-select
          :items="appTypesList"
          v-model="type"
          :error-messages="appTypeErrors"
          outlined
          dense
          label="App Type"
        ></v-select>
      </v-col>
      <v-col cols="8">
        <v-select
          :items="appFrameworksList"
          v-model="framework"
          :error-messages="appFrameworkErrors"
          outlined
          dense
          label="Framework"
        ></v-select>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="domain_name"
          color="primary"
          outlined
          dense
          label="Domain name"
        />
      </v-col>
      <v-col cols="8">
        <v-btn
          @click="handleCreate"
          :disabled="buttonDisabledStatus"
          color="primary"
          block
        >
          Create
        </v-btn>
      </v-col>
    </v-row>
</template>

<script>
import basicAlert from '../../alerts/basicAlert.vue'
import { createApp } from '@/api/apps'
import appTypes from '@/utils/appTypes'
import appFrameworks from '@/utils/appFrameworks'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from '@/helpers/validation'

export default {
  components: { basicAlert },
  validations: {
    title: {
      required,
      maxLength: maxLength(50)
    },
    framework: {
      required
    },
    type: {
      required
    }
  },
  data () {
    return {
      title: null,
      description: null,
      framework: null,
      type: null,
      domain_name: null,

      appTypesList: appTypes,
      appFrameworksList: appFrameworks,

      buttonDisabledStatus: false
    }
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return errors
      }

      !this.$v.title.required && errors.push(validationMessage('Title', 'required'))
      !this.$v.title.maxLength && errors.push(validationMessage('Title', 'maxLength', { size: 50 }))
      this.setDisableStatus(true)
      return errors
    },
    appFrameworkErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return errors
      }

      !this.$v.framework.required && errors.push(validationMessage('App framework', 'required'))
      return errors
    },
    appTypeErrors () {
      const errors = []
      if (!this.$v.$anyError) {
        this.setDisableStatus(false)
        return errors
      }

      !this.$v.type.required && errors.push(validationMessage('App Type', 'required'))
      return errors
    },
    /**
     * to be used in create request
     */
    formData () {
      return {
        name: this.title,
        type: this.type,
        framework: this.framework,
        description: this.description,
        domain_name: this.domain_name,
        subscription: this.subscription
      }
    }
  },
  methods: {
    setDisableStatus (value) {
      this.buttonDisabledStatus = value
    },
    handleCreate () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        // if there are no errors
        createApp(this.formData).then((response) => {
          this.$swal({
            text: 'App created Successfully',
            icon: 'success'
          }).then(() => {
            this.$router.push({ name: 'dashboard-app-index' })
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style>

</style>
