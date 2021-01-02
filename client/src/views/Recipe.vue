<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12">
              <v-card-title class="text-capitalize mb-1 display-2">
                {{recipeData.title}}
                <v-btn v-if="likedRecipe" icon large color="primary" @click="unlikeRecipe(recipeData.id)">
                  <v-icon large>mdi-heart</v-icon>
                </v-btn>
                <v-btn v-else icon large color="primary" @click="likeRecipe(recipeData.id)">
                  <v-icon large>mdi-heart-outline</v-icon>
                </v-btn>
                <editRecipeModal 
                    :recipeId='recipeData.id'
                    v-if='recipeData.writer == userEmail'
                  />
              </v-card-title>
              <v-card-text >By {{recipeData.writer}}</v-card-text>              
              <v-card-text class="title">{{recipeData.description}}</v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col 
            style="max-width: 200px;"
            >
            <v-card raised>
              <v-card-text>
                <b>Prep Time</b> : {{recipeData.prep_time}}
              </v-card-text>
              <v-card-text>
                <b>Cook Time</b> : {{recipeData.cook_time}}
              </v-card-text>
              <v-card-text>
                <b>Servings</b> : {{recipeData.servings}}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
          <v-img
            :src="recipeData.photo"
            class="black--text"
            max-height="600px"
            max-width="600px"
          >
          </v-img>     
          </v-col>     
        </v-row>

        <v-row>
          <v-col>
            <v-card 
            flat
            class="pt-2 pb-2"
            style="background: #fcfbf5;"
            >
              <span class="mr-2">
                <viewPhotosModal/>
              </span>
              <span>
                <addPhotoModal/>
              </span>
            </v-card>

          </v-col>
        </v-row>
        <br>
        <hr>
        <v-row>
          <v-col>
            <v-card-title>Ingredients</v-card-title>
            <ul v-for="(ingredient, index) in recipeData.ingredients" :key="index" style="list-style: none;">
              <li class="pa-4">
                <v-icon small>mdi-square-medium</v-icon> {{ingredient}}
              </li>
            </ul>
          </v-col>
        </v-row>

        <hr>
        <v-row>
          <v-col cols="lg-6 md-12">
            <v-card-title>Steps</v-card-title>
            <ol v-for="(step, index) in recipeData.steps" :key="index" style="list-style: none;">
              <v-card outlined class="ma-2">
              <li class="pa-4">
                <b>Step {{index+1}}</b><br> 
                {{step}}
              </li>
              </v-card>
            </ol>
          </v-col>
        </v-row>

        <hr>
        <v-row>
          <v-col>
            <v-form 
            class="px-10" 
            ref="form"
          >
              <v-text-field 
              label="Write Comment" 
              v-model="comment" 
              prepend-icon="mdi-comment"
              append-outer-icon="mdi-send"
              @click:append-outer="addComment"
              required
            />

            </v-form>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="lg-6 md-12">
            <v-card v-for="comment in comments" :key="comment.id" shaped class="ma-2" style="background-color: rgba(247, 213, 213, 0.612);">
              <v-card-text class="headline">
                {{comment.comment}}
              </v-card-text>
              <v-card-text>
                {{comment.writer}}
                <br>
                {{convertDate(comment.createdAt)}}                
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RecipeService from '../services/RecipesService'
import CommentService from '../services/CommentService'
import addPhotoModal from '../components/addPhotoModal'
import viewPhotosModal from '../components/viewPhotosModal'
import editRecipeModal from '../components/editRecipeModal'
import { serverBus } from '../main'
import moment from 'moment'

export default {
  name: 'Profile',
  components: {
    addPhotoModal,
    viewPhotosModal,
    editRecipeModal
  },
  data() {
    return {
      recipeData: [],
      snackbarText: '',
      comments: [],
      comment: '',
      userEmail: '',
      recipes: [],
      likedRecipe: false,
    }
  },
  methods: {
    async getSingleRecipe() {
      const urlParams = new URLSearchParams(window.location.search);
      try {
        const response = await RecipeService.getSingleRecipe({
          id: urlParams.get('id')
        })
        this.recipeData = response.data.success
        this.getComments()
      } catch (err) {
        console.log(err)
      }
    },
    async likeRecipe(id) {
      try {
        const response = await RecipeService.likeRecipe({
          id: id
        })
        this.snackbarText = response.data.response
        serverBus.$emit('snackBar', this.snackbarText)
        this.likedRecipe = true
      } catch (err) {
        console.log(err)
      }
    },
    async addComment() {
      try {
        const response = await CommentService.addComment({
          comment: this.comment,
          recipe_id: this.recipeData.id
        })
        this.comment = ""
        this.snackbarText = response.data.success
        serverBus.$emit('snackBar', this.snackbarText)
        this.getComments()
      } catch (err) {
        console.log(err)
      }
    },
    async getComments() {
      try {
        const response = await CommentService.getComments({
          recipe_id: this.recipeData.id
        })
        this.comments = response.data.success
      } catch (err) {
        console.log(err)
      }
    },
    convertDate(date) {
      return moment(date).format('MMM DD YYYY')
    },
    async getUserEmail() {
      try {
        const response = await RecipeService.getLoggedInEmail()
        this.userEmail = response.data.success.email
      } catch (err) {
        console.log(err)
      }
    },
    async getLikedRecipes() {
      try {
        let response = await RecipeService.getLikedRecipes()
        response = response.data.success
        for (let i = 0; i < response.length; i++) {
          this.recipes.push(response[i].id)
        }
        this.likedRecipe = this.recipes.includes(this.recipeData.id)
      } catch (err) {
        console.log(err)
      }
    },
    async unlikeRecipe(id) {
      try {
        const response = await RecipeService.unlikeRecipe({
          id: id
        })
        this.snackbarText = response.data.response
        serverBus.$emit('snackBar', this.snackbarText)
        this.likedRecipe = false
      } catch (err) {
        console.log(err)
      }
    },
  },
  mounted() {
    this.getSingleRecipe()
    this.getUserEmail()
    this.getLikedRecipes()
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}

</style>