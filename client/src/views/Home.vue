<template>
  <v-app>
    <v-content>
      <v-container fluid>

        <v-row cols="12" v-if="profileInfo.avatar === null || profileInfo.name === null">
          <v-btn @click="goToProfile()" class='error'>
            Please setup your profile
          </v-btn>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="12" sm="12" md="4" lg="3">
            <v-select
              v-model="filter"
              :items="types"
              label="Filter"
              hint="Filter by Cuisines"
              persistent-hint
            ></v-select>
          </v-col>
        </v-row>

        <v-row dense v-if="!filteredRecipes">
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
                <v-card-title v-text="recipe.title"></v-card-title>
              </v-img>

              <v-card-text v-text="recipe.description"></v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row dense v-if="filteredRecipes">
          <v-col
            v-for="(recipe, index) in filteredRecipes"
            :key="index"
          >
            <v-card width="400px" height='300px' @click="goToRecipePage(recipe.id)">
              <v-img
                :src="recipe.photo"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                
              >
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
import SearchService from '../services/SearchService'
import { homePageRefresh } from '../main'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      recipes: [],
      filteredRecipes: '',
      types: [
        'No Filter',
        'Salads',
        'Vegetarian',
        'Entrees',
        'Soups',
        'Breads',
        'Asian',
        'American',
        'Starters',
        'Breakfast',
        'Lunch',
        'Dinner',
        'Pasta',
        'Greek',
        'Dessert'
      ],
      filter: '',
      profileInfo: [
        {avatar: null, name: null}
      ],
    }
  },
  methods: {
    async getAllRecipes() {
      try { 
        const response = await RecipeService.getAllRecipes()
        this.recipes = response.data.success
      } catch (err) {
        console.log(err)
      }
    },
    goToRecipePage(id) {
      this.$router.push(`/recipe/?id=${id}`)
    },
    sortBy() {
      if (this.filter !== '') {
        this.filteredRecipes = this.recipes.filter((recipe) => {
          return (recipe.type == this.filter)
        })
      }
    },
    async findUserInfo() {
      try {
        await SearchService.findUserInfo().then(resp => {
          this.profileInfo.avatar = resp.data.data.avatar
          this.profileInfo.name = resp.data.data.name
        })
      } catch (err) {
        console.log(err)
      }
    },
    goToProfile() {
      this.$router.push('/profile')
    }
  },
  created() {
    homePageRefresh.$on('homePageRefresh', () => {
      this.getAllRecipes()
    });
  },
  mounted() {
    this.getAllRecipes()
    this.findUserInfo()
    window.scrollTo(0, 0)
  },
  watch: {
    'filter'() {
      if ( this.filter === 'No Filter'){
        this.filteredRecipes = ''
      } else if (this.filter !== '' || this.filter !== 'No Filter') {
        this.sortBy()
      }
    }
  },
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
