<template>
  <v-app>
    <v-content>
      <v-container>

        <v-row>
          <v-col cols="12">
              <v-card-title class="text-capitalize mb-1 display-2">{{recipeData.title}}</v-card-title>
              <v-card-text class="title">{{recipeData.description}}</v-card-text>
          </v-col>
        </v-row>
        
        <v-row justify="start">
          <v-img
            :src="recipeData.photo"
            class="black--text align-start"
            max-width="600px"
            max-height="600px"
          >
          </v-img>

          <v-col cols="lg-2 md-4">
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
          <v-col cols="6">
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

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RecipeService from '../services/RecipesService'


export default {
  name: 'Profile',
  data() {
    return {
      recipeData: [],
    }
  },
  methods: {
    async getSingleRecipe() {
      const urlParams = new URLSearchParams(window.location.search);
      try {
        const response = await RecipeService.getSingleRecipe({
          id: urlParams.get('id')
        })
        console.log(response.data.success)
        this.recipeData = response.data.success
      } catch (err) {
        console.log(err)
      }
    } 
  },
  mounted() {
    this.getSingleRecipe()
  }
}
</script>