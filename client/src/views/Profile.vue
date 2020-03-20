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

            <v-btn text color="primary" @click="addImage()" @keyup.enter="addImage">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="inputNameDialog" max-width="500px">
        <v-card>
          <v-card-text>
            <template>
            <v-text-field
              label="Input Name"
              v-model="name"
              class='pa-5'
              @keyup.enter="addName"
            >
            </v-text-field>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="addName()">Update Name</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-container fluid v-if="profileData">
        <v-row dense justify="start" class="pa-5">

          <v-col cols="auto" v-if="profileData.avatar !== null">
            <v-card max-width="200px" min-width='200px'>
              <v-img
                :src="profileData.avatar"
                class="black--text align-start"
                height="200px"
                width="200px"
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

          <v-col cols="auto" v-else>
            <v-card max-width="200px" min-width='200px'>
              <v-img
                src="../assets/whitebackground2.png"
                class="black--text align-start"
                height="200px"
                width="200px"
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
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            </v-card>
          </v-col>

          <v-col align-self="start">
            <v-card height="200px" class="black--text align-start">
              <v-hover
                v-slot:default="{ hover }"
              >
              <v-card-title v-if="profileData.name !== null" v-text="profileData.name" @click="inputName" :style="hover ? 'background-color:rgba(228, 115, 115, 0.2);' : 'background-color:white;'"></v-card-title>
              <v-card-title v-else @click="inputName" :style="hover ? 'background-color:rgba(228, 115, 115, 0.2);' : 'background-color:white;'">Input Your Name</v-card-title>
              </v-hover>
              <v-card-text v-text="profileData.email"></v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="pa-5">
          <v-col cols="12">
            <v-card class="black--text align-start" flat>
              <v-card-title class="display-1">Recipes</v-card-title>
            </v-card>
            <v-card @click="goToRecipePage(recipe.id)" outlined v-for="recipe in recipes" :key="recipe.id" class="ma-2">
                <v-card-title class="subtitle-1">{{ recipe.title }}</v-card-title>
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
import RecipeService from '../services/RecipesService'


export default {
  name: 'Profile',
  components: {
  },
  data() {
    return {
      image: '',
      dialog: false,
      file: null,
      success: '',
      loading: false,
      imgurSecret: '',
      profileData: null,
      name: '',
      inputNameDialog: false,
      recipes: [],
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
          axios.post("/uploadProfileImg", {
            link: response.data.data.link
          }).then(() => {
            this.loading = false
            this.success = "Successful Upload!"
            this.getProfileData()
            this.dialog = false
          })
        })
    },
    async getImgurSecret() {
      try {
        const response = await ImgurService.getImgurSecret()
        this.imgurSecret = response.data.success
      } catch (err) {
        console.log(err)
      }
    },
    async getProfileData() {
      try {
        const response = await ImgurService.getProfileData()
        this.profileData = response.data
      } catch (err) {
        console.log(err)
      }
    },
    inputName() {
      this.inputNameDialog = true
    },
    async addName() {
      try {
        const response = await ImgurService.inputName({
          name: this.name
        })
        this.getProfileData()
        this.inputNameDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    async getUserRecipes() {
      try {
        const response = await RecipeService.getUserRecipes()
        this.recipes = response.data.success
      } catch (err) {
        console.log(err)
      }
    },
    goToRecipePage(id) {
      this.$router.push(`/recipe/?id=${id}`)
    }
  },
  mounted() {
    this.getImgurSecret()
    this.getProfileData()
    this.getUserRecipes()
  }
}
</script>

<style scoped>
.v-card__title {
  cursor:pointer;
}
</style>


