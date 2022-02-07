<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-file-input
          v-model="selectedImage"
          accept="image/png, image/jpeg, image/bmp"
          label="App icon"
          outlined
          prepend-icon="mdi-image"
          dense
        />
      </v-col>
      <v-col v-if="documentImage" cols="12" class="d-flex justify-center">
        <v-card max-width="150px" outlined class="align-center">
          <v-img max-width="150px" :src="documentImage" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedImage: null,
      uploadedImage64: null
    }
  },
  computed: {
    documentImage () {
      if (this.selectedImage !== null) {
        return this.imagePreview(this.selectedImage)
      } else {
        return null
      }
    }
  },
  watch: {
    async selectedImage () {
      if (Boolean(this.selectedImage) !== false) {
        this.uploadedImage64 = null

        await this.getBase64Format(this.selectedImage).then((response) => {
          this.uploadedImage64 = response
        })
      } else {
        this.uploadedImage64 = null
      }

      this.$parent.$emit('imageUploadUpdated', this.uploadedImage64)
    }
  },
  methods: {
    getBase64Format (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    imagePreview (file) {
      return URL.createObjectURL(file)
    }
  }
}
</script>

<style>

</style>
