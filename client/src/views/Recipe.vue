<template>
  <v-app>
    <v-content>
      <h1>This is the recipe page</h1>
    </v-content>
  </v-app>
</template>

<script>
import RecipeService from '../services/RecipesService'


export default {
  name: 'Profile',
  data() {
    return {

    }
  },
  methods: {
    async getSingleRecipe() {
      const urlParams = new URLSearchParams(window.location.search);
      try {
        const response = await RecipeService.getSingleRecipe({
          id: urlParams.get('id')
        })
        console.log(response)
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