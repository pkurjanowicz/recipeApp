<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="primary">Add New Photo</v-btn>
    </template>
      <v-card>
        <v-card-text>
          <template>
            <v-file-input 
              label="File input" 
              v-model='file' 
              class='pa-5'
              :success-messages='success'
              :error-messages="error"
              :loading='loading'
            ></v-file-input>
          </template>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="addImage()" @keyup.enter="addImage">Submit</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import ImgurService from '../services/ImgurService'
import { serverBus } from '../main'

export default {
  data() {
    return {
      file: null,
      loading: false,
      dialog: false,
      success: '',
      error: '',
      imgurSecret: '',
      snackbarText: '',
    }
  },
  methods: {
    addImage() {
      if (this.file !== null) {
      const urlParams = new URLSearchParams(window.location.search);
      this.loading = true
      let formData = new FormData();
      formData.append('image', this.file);
      axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': "Client-ID "+this.imgurSecret,
          'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          axios.post("/addAdditionalPhoto", {
            photo: response.data.data.link,
            recipe_id: urlParams.get('id')
          }).then(resp => {
            this.loading = false
            this.success = "Successful Upload!"
            this.dialog = false
            this.snackbarText = resp.data.success
            serverBus.$emit('snackBar', this.snackbarText)
            this.success = ""
            this.file = null
          })
        })
      } else {
        this.error = "Please submit a value"
      }
    },
    async getImgurSecret() {
      try {
        const response = await ImgurService.getImgurSecret()
        this.imgurSecret = response.data.success
      } catch (err) {
        console.log(err)
      }
    },
  },
  mounted() {
    this.getImgurSecret()
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>