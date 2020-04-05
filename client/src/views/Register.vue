<template>
  <v-app>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            md="8"
            lg="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
                src='../assets/med-food-hero.jpg'
              >
              <template v-slot:img="{ props }">
                <v-img
                  v-bind="props"
                  gradient="to bottom right, rgb(242,161,188, 0.9), rgba(25,32,72,0.8)"
                ></v-img>
              </template>
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account-circle"
                  />
                  <v-text-field
                    label="Password"
                    v-model="password"
                    autocomplete="new-password"
                    prepend-icon="mdi-lock"
                    :type="showPassword ? 'text' : 'password'"
                  />
                  <v-text-field
                    label="Confirm Password"
                    v-model="confirmPassword"
                    autocomplete="new-password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    @keyup.enter="submitRegister"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                @click='submitRegister()' 
                color="primary">
                Register
                </v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                  to='/login'
                  color="secondary"
                  small
                  text
                >
                Have an account already?
                <v-icon>mdi-arrow-right-bold</v-icon>
                </v-btn>
              </v-card-actions>
              <v-alert v-if='error != null' type="error">
                  <div v-html="error" />
              </v-alert>
              <v-alert v-if='success != null' type="success">
                  {{success}}
              </v-alert>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthenicationService from '../services/AuthenticationService'

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      success: null,
      showPassword: false,
    }
  },
  props: {
    source: String,
  },
  methods: {
    async submitRegister() {
      if (this.password === this.confirmPassword) {
        try {
          await AuthenicationService.register({
          email : this.email,
          password : this.password
        })
        this.error = null
        this.password = ''
        this.email = ''
        this.confirmPassword = ''
        this.success = 'Thank you for registering!'
        } catch (error){
          this.error = error.response.data.error
          this.success = null
        }
      } else {
        this.error = 'Passwords do not match'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
