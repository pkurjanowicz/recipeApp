<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="primary">Add New Recipe</v-btn>
    </template>
      <v-card>
        <v-card-title >
          <h2 class="font-weight-light mb-6">Add New Recipe</h2>
        </v-card-title>
        <v-card-text>
          <v-form 
            class="px-10" 
            ref="form"
            v-model="valid"
          >

            <v-text-field 
              label="Title" 
              v-model="title" 
              prepend-icon="mdi-format-title"
              required
              :counter="20"
              :rules="nameRules"
            />

            <v-text-field 
              label="Prep Time" 
              v-model="prepTime" 
              prepend-icon="mdi-av-timer"
              required
              :rules="[v => !!v || 'Prep Time is required', v => (v && v.length <= 20) || 'Prep Time must be less than 20 characters']"
              :counter="20"
            />

            <v-text-field 
              label="Cook Time" 
              v-model="cookTime" 
              prepend-icon="mdi-av-timer"
              required
              :rules="[v => !!v || 'Cook Time is required', v => (v && v.length <= 20) || 'Cook Time must be less than 20 characters']"
              :counter="20"
            />

            <v-select
              label="Servings"
              v-model="servings"
              :items="serving"
              :rules="[v => !!v || 'Servings is required']"
              prepend-icon="mdi-account-group-outline"
              required
            ></v-select>

            <v-select
              label="Cuisine"
              v-model="type"
              :items="types"
              :rules="[v => !!v || 'Cuisine is required']"
              prepend-icon="mdi-food"
              required
            ></v-select>

            <v-textarea 
              label="Description" 
              v-model="content" 
              prepend-icon="mdi-lead-pencil"
              :rules="infoRules"
              :counter="120"
              required
            />

            <v-text-field 
              label="Ingredient" 
              prepend-icon="mdi-format-list-bulleted"
              v-model="currentIngredient"
              required
              :rules="[() => ingredients.length !== 0 || currentIngredient !== '' || 'Ingredients are required', currentIngredient.length <= 30 || 'Ingredient must be less than 30 characters']"
              @click:append-outer="addIngredient(currentIngredient)"
              append-outer-icon='mdi-plus'
              :counter="30"
            />
            <p v-if="ingredientError" class="red--text" style="display:inline-block">{{ingredientError}}</p>
            <span v-for="(ingredient, index) in ingredients" :key="index">
              <ul>
                <li style="display: inline-block;"><v-icon small>mdi-check</v-icon> {{ingredient}}</li>
                <span style="display:inline-block">
                  <v-btn text icon @click="deleteIngredient(ingredient)">
                    <v-icon small>mdi-close-circle</v-icon>
                  </v-btn>
                </span>
              </ul>
            </span>

            <v-textarea  
              label="Step" 
              prepend-icon="mdi-stairs"
              v-model="currentStep"
              required
              @click:append-outer="addStep(currentStep)"
              append-outer-icon='mdi-plus'
              :counter="120"
              :rules="[() => steps.length !== 0 || currentStep !== '' || 'Steps are required',currentStep.length <= 120 || 'Step must be less than 30 characters']"
            />
            <p v-if="stepError" class="red--text" style="display:inline-block">{{stepError}}</p>
            <span v-for="(step, index) in steps" :key="step">
              <ol>
                <li style="display: inline-block;">{{index+1}}. {{step}}</li>
                <span style="display:inline-block">
                  <v-btn text icon @click="deleteStep(step)">
                    <v-icon small>mdi-close-circle</v-icon>
                  </v-btn>
                </span>
              </ol>
            </span>

            <v-file-input 
              label="Upload Picture" 
              v-model='file' 
              class='pa-5'
              :success-messages='success'
              :loading='loading'
              @click:append-outer="addImage()"
              append-outer-icon='mdi-send'
            />

            <v-btn 
              text 
              class="primary mt-10 mb-5" 
              @click="addRecipe()"
              :disabled="!valid"
            >
            Add Recipe
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import ImgurService from '../services/ImgurService'
import RecipeService from '../services/RecipesService'


export default {
  
  data() {
    return {
      title: '',
      cookTime: '',
      prepTime: '',
      servings: '',
      content: '',
      type: '',
      currentIngredient: '',
      currentStep: '',
      menu1: false,
      valid: true,
      dialog: false,
      file: null,
      loading: false,
      image: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      infoRules: [
        v => !!v || 'Information is required',
        v => (v && v.length <= 120) || 'Information must be less than 120 characters',
      ],
      ingredients: [],
      steps: [],
      ingredientError: '',
      stepError: '',
      success: '',
      types: [
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
      ],
      serving: ["1","2","3","4","5","6","7","8","9","10"],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        console.log(this.title, this.content, this.date)
        this.dialog = false
        this.title = ''
        this.content = ''
        this.$emit('projectAdded')
        this.resetValidation()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    addIngredient(ingredient) {
      if (this.ingredients.includes(ingredient)) {
        this.ingredientError = "List already includes ingredient"
      } else if (ingredient === '') {
        this.ingredientError = "You need to submit a value"
      } else {  
        this.ingredients.push(ingredient);
        this.ingredientError = ''
        this.currentIngredient = ''
      }
    },
    deleteIngredient(ingredient) {
      this.ingredients = this.ingredients.filter(item => item !== ingredient)
      this.ingredientError = ''
    },
    addStep(step) {
      if (this.steps.includes(step)) {
        this.stepError = "List already includes step"
      } else if (step === '') {
        this.stepError = "You need to submit a value"
      } else {  
        this.steps.push(step);
        this.stepError = ''
        this.currentStep = ''
      }
    },
    deleteStep(step) {
      this.steps = this.steps.filter(item => item !== step)
      this.stepError = ''
    },
    async getImgurSecret() {
      try {
        const response = await ImgurService.getImgurSecret()
        this.imgurSecret = response.data.success
      } catch (err) {
        console.log(err)
      }
    },
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
          this.image = response.data.data.link
          this.loading = false
          this.success = "Successful Upload!"
        })
    },
    async addRecipe() {
      console.log("clicked")
      try {
        await RecipeService.addRecipe({
          title: this.title,
          cook_time: this.cookTime,
          prep_time: this.prepTime,
          type: this.type,
          servings: this.servings,
          description: this.content,
          ingredients: this.ingredients,
          steps: this.steps,
          photo: this.image,
        }).then(resp => {
          // this.title = ''
          // this.cookTime = ''
          // this.prepTime =''
          // this.type = ''
          // this.servings = ''
          // this.content = ''
          // this.ingredients = ''
          // this.steps = ''
          // this.image = ''
          console.log(resp)
        })
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
