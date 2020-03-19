<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="(recipe, index) in recipes"
            :key="index"
          >
            <v-card width="400px" height='300px' @click="goToRecipePage(recipe.id)">
              <v-img
                :src="recipe.photo"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                
              >
                <v-card-actions style="float: right;">
                    <v-btn icon large color="primary">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-title v-text="recipe.title"></v-card-title>
              </v-img>

              <v-card-text v-text="recipe.description"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RecipeService from '../services/RecipesService'
import { homePageRefresh } from '../main'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      recipes: [],
    }
  },
  methods: {
    async getAllRecipes() {
      try { 
        const response = await RecipeService.getAllRecipes()
        this.recipes = response.data.success
        console.log(this.recipes)
      } catch (err) {
        console.log(err)
      }
    },
    goToRecipePage(id) {
      this.$router.push(`/recipe/?id=${id}`)
    }
  },
  created() {
    homePageRefresh.$on('homePageRefresh', () => {
      this.getAllRecipes()
    });
  },
  mounted() {
    this.getAllRecipes()
  }
}
</script>

<style scoped>

</style>
