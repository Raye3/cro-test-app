<template>
    <v-row>
      <basic-alert />
      <v-col cols="12">
        <h1 class="primary--text">App name info</h1>
      </v-col>
      <v-col cols="12">
        <v-text-field
          color="primary"
          v-model="title"
          :error-messages="titleErrors"
          outlined
          dense
          label="App title"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="description"
          color="primary"
          outlined
          dense
          label="App Description"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          :items="appTypesList"
          v-model="type"
          :error-messages="appTypeErrors"
          outlined
          dense
          label="App Type"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-select
          :items="appFrameworksList"
          v-model="framework"
          :error-messages="appFrameworkErrors"
          outlined
          dense
          label="Framework"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="domain_name"
          color="primary"
          outlined
          dense
          label="Domain name"
        />
      </v-col>
      <v-col cols="12">
        <screenshot-uploader />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="8">
            <v-btn
              @click="handleUpdate"
              :disabled="buttonDisabledStatus"
              color="primary"
              block
            >
              Update
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              @click="handleDelete"
              color="error"
              outlined
              block
            >
              <v-icon>mdi-delete</v-icon>
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
import screenshotUploader from './screenshotUploader.vue'
import { deleteApp, getAppByID, updateApp } from '../../../api/apps'
import basicAlert from '../../alerts/basicAlert.vue'
import appTypes from '@/utils/appTypes'
import appFrameworks from '@/utils/appFrameworks'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from '@/helpers/validation'
export default {
  components: {
    basicAlert,
    screenshotUploader
  },
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
      appIcon: null,

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
      !this.$v.title.maxLength && errors.push(validationMessage('Title', 'maxLength', 50))
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
    formData () {
      return {
        name: this.title,
        description: this.description,
        type: this.type,
        framework: this.framework,
        domain_name: this.domain_name
        // screenshot: this.appIcon
      }
    }
  },
  methods: {
    setDisableStatus (value) {
      this.buttonDisabledStatus = value
    },
    handleUpdate () {
      this.$v.$touch()
      console.log(this.formData)
      // if there are no valdiations errors
      if (!this.$v.$anyError) {
        const appID = this.$route.params.id

        updateApp(appID, this.formData).then(() => {
          // if updated successfully
          this.$emit('fireAlert', { type: 'success', message: 'Updated succesfully' })
        }).catch(() => {
          this.$emit('fireAlert', { message: 'Something went wrong when updating' })
        })
      }
    },
    handleDelete () {
      const appID = this.$route.params.id
      this.$swal({
        text: 'Are you sure you want to delete this app ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Yes'
      }).then((response) => {
        if (response.isConfirmed) {
          deleteApp(appID).then(() => {
            this.$swal({
              text: 'App deleted Sucessfully',
              icon: 'success'
            }).then(() => {
              this.$router.push({ name: 'dashboard-app-index' })
            })
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    async getApp () {
      const appID = this.$route.params.id
      await getAppByID(appID).then((response) => {
        this.title = response.data.name
        this.description = response.data.description
        this.framework = response.data.framework
        this.type = response.data.type
        this.domain_name = response.data.domain_name
        this.appIcon = response.data.screenshot
      }).catch((error) => {
        console.log(error)
      })
    },
    updateApp () {
    }
  },
  created () {
    // upload event
    this.$on('imageUploadUpdated', (fileUploaded) => {
      this.appIcon = fileUploaded
    })
  },
  mounted () {
    this.getApp()
  }
}
</script>

<style>

</style>
