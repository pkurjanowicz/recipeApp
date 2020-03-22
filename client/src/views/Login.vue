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
                  gradient="to bottom right, rgba(193, 66, 66, 0.9), rgba(25,32,72,0.8)"
                ></v-img>
              </template>
                <v-toolbar-title>Login</v-toolbar-title>
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
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    @keyup.enter="submitLogin"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                @click='submitLoginGuest()' 
                color="secondary"
                outlined
                small>
                Login as Guest
                </v-btn>
                <v-spacer />
                <v-btn 
                @click='submitLogin()' 
                color="primary">
                Login
                </v-btn>
              </v-card-actions>
              <v-card-actions>
                  <v-spacer />
                  <v-btn 
                    to='/register'
                    color="secondary"
                    small
                    text
                  >
                  Create an account
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
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      success: null,
      showPassword: false,
    }
  },
  props: {
    source: String,
  },
  methods: {
    async submitLogin() {
      try {
          await AuthenicationService.login({
          email : this.email,
          password : this.password
        })
        this.error = null
        this.password = ''
        this.email = ''
        this.$router.push('/')
      } catch (error){
        this.error = error.response.data.error
        this.success = null
      }
    },
    async submitLoginGuest() {
      try {
          await AuthenicationService.loginGuest()
          this.error = null
          this.$router.push('/')
      } catch (error){
        this.error = error.response.data.error
        this.success = null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
