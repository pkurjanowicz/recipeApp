<template>
  <v-app>
    <v-content>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <template>
              <v-file-input 
                label="File input" 
                v-model='file' 
                class='pa-5'
                :success-messages='success'
                :loading='loading'
              ></v-file-input>
            </template>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="primary" @click="addImage()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid>
        <v-row dense>
          <v-col cols="6">
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                class="black--text align-start"
                height="200px"
              >
              </v-img>
              <template >
              <v-btn
                fab
                color="primary"
                bottom
                right
                absolute
                @click="dialog = !dialog"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            </v-card>

          </v-col>
          <v-col cols="6">
            <v-card height="200px" class="black--text align-start">
              <v-card-title>{{name}}</v-card-title>
              <v-card-text>{{email}}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card height="200px" class="black--text align-start">
              <v-card-title >Recipes</v-card-title>
              <v-card-text></v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import ImgurService from '../services/ImgurService'

export default {
  name: 'Profile',
  data() {
    return {
      name: 'Pete Kurjanowicz',
      email: 'pkurjanowicz1@gmail.com',
      image: '',
      dialog: false,
      file: null,
      success: '',
      loading: false,
      imgurSecret: '',
    }
  },
  methods: {
    addImage() {
      this.loading = true
      let formData = new FormData();
      formData.append('image', this.file);
      axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': this.imgurSecret,
          'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          console.log(response)
          this.loading = false
          this.success = "Successful Upload!"
        })
    },
    async getImgurSecret() {
      try {
        const response = await ImgurService.getImgurSecret()
        this.imgurSecret = response.data.success
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.getImgurSecret()
  }
}
</script>

<style scoped>

</style>
