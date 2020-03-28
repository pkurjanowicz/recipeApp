<template>
  <v-app>
    <v-content>
      <v-container fluid v-if="recipes">
        <v-card @click="goToRecipePage(recipe.id)" v-for="recipe in recipes" :key="recipe.id">
          <v-row dense justify="start" class="pa-5"  >

            <v-col cols="auto">
              <v-card max-width="200px" min-width='200px' flat>
                <v-img
                  :src="recipe.photo"
                  class="black--text align-start"
                  height="200px"
                  width="200px"
                >
                </v-img>
              </v-card>
            </v-col>

            <v-col align-self="start">
              <v-card height="200px" class="black--text align-start" flat>
                <v-card-title v-text="recipe.title"></v-card-title>
                <v-card-text v-text="recipe.writer"></v-card-text>
                <v-card-text v-text="recipe.description"></v-card-text>
              </v-card>
            </v-col>

          </v-row>
        </v-card>
      </v-container>

    <v-container v-if="recipes == ''">
      <v-card flat>
        <v-card-title class="profile-1">No Recipes yet</v-card-title>
      </v-card>
    </v-container>

    </v-content>
  </v-app>
</template>

<script>
import RecipeService from '../services/RecipesService'

export default {
  data() {
    return {
      recipes: ""
    }
  },
  methods: {
    async getFriendRecipes() {
      const urlParams = new URLSearchParams(window.location.search);
      try {
        const response = await RecipeService.getFriendRecipes({
          id: urlParams.get('friend_id')
        })
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
    this.getFriendRecipes()
  }
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>