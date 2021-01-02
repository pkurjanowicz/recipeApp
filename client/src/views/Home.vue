<template>
  <v-app>
    <v-content>
      <v-container 
        fluid
      >
          <v-parallax
            dark
            src="../assets/vegetables.jpg"
            v-if="select == null"
          >
            <v-overlay 
            value="true" 
            absolute
            :opacity=".6"
            >
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  class="text-h3 mb-3 black--text font-weight-bold text-center"
                  style="font-size:100px"
                >
                  <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    cache-items
                    flat
                    clearable
                    hide-no-data
                    label="Search a Recipe"
                    prepend-icon="mdi-magnify"
                    return-object
                    filled
                    rounded
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-overlay>
          </v-parallax>

        <v-row cols="12" v-if="profileInfo.avatar === null || profileInfo.name === null">
          <v-btn @click="goToProfile()" class='error'>
            Please setup your profile
          </v-btn>
        </v-row>

        <v-row class="pb-4">
          <v-col cols="12" sm="12" md="4" lg="3" v-if="select == null">
            <v-select
              v-model="filter"
              :items="types"
              label="Filter"
              hint="Filter by Cuisines"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="3" v-if="select !== null">
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              cache-items
              flat
              clearable
              label="Select Recipe"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row 
          v-if="!filteredRecipes"
          justify="center"
        >
          <v-col
            v-for="(recipe, index) in recipes"
            :key="index"           
          >
            <v-card 
              width="400px" 
              height='400px' 
              @click="goToRecipePage(recipe.id)"
            >
              <v-img
                :src="recipe.photo"
                height="200px"
              />
              <div 
                align="center"
                v-text="recipe.type"
                class="text-subtitle-2 grey--text pt-3 text-uppercase"
              />
              <div 
                align="center"
                v-text="recipe.title"
                class="text-h5 text--black pa-3 pb-5"
              />
              <hr style="width:60px; margin: auto;"/>              
              <div
                align="center"
                v-text="convertDate(recipe.updatedAt)"
                class="text-subtitle-2 primary--text pt-3 text-uppercase"                
              />
            </v-card>
          </v-col>
        </v-row>

        <v-row dense v-if="filteredRecipes">
          <v-col
            v-for="(recipe, index) in filteredRecipes"
            :key="index"
          >
            <v-card width="400px" height='400px' @click="goToRecipePage(recipe.id)">
              <v-img
                :src="recipe.photo"
                height="200px"
              />
              <div 
                align="center"
                v-text="recipe.type"
                class="text-subtitle-2 grey--text pt-3 text-uppercase"
              />
              <div 
                align="center"
                v-text="recipe.title"
                class="text-h5 text--black pa-3 pb-5"
              />
              <hr style="width:60px; margin: auto;"/>              
              <div
                align="center"
                v-text="convertDate(recipe.updatedAt)"
                class="text-subtitle-2 primary--text pt-3 text-uppercase"                
              />
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
      loading: false,
        items: [],
        search: null,
        select: null,
        searchfilter: [],
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
    },
    sortBy() {
      if (this.filter !== '') {
        this.filteredRecipes = this.recipes.filter((recipe) => {
          return (recipe.type == this.filter)
        })
      }
    },
    sortBySearch() {
      if (this.select !== null) {
        this.filteredRecipes = this.recipes.filter((recipe) => {
          return (recipe.title == this.select)
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
    },
    querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.recipes.forEach(recipe => this.searchfilter.push(recipe.title))
          this.items = this.searchfilter.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
    convertDate(date) {
      var date = new Date(date);
      return date.toLocaleDateString()
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
    },
    'select'() {
      if ( this.select === null){
        this.filteredRecipes = ''
      } else if (this.select !== null) {
        this.sortBySearch()
      }
    },
    search (val) {
        val && val !== this.select && this.querySelections(val)
      },
  },
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}


</style>
