<template>
  <v-app>
    <v-content>
      <div class="Group">
        <v-card
          color="white"
          elevation='0'
        >
          <v-card-title class="white">
            Find Friends
          </v-card-title>
          <v-card-text>
            <v-row align='center' wrap>
              <v-col>
                <v-responsive width="400" min-width="400">
                  <v-text-field
                    prepend-icon="mdi-account-search"
                    v-model="submitEmail"
                    label="Search friends by email"
                    @keyup.enter="search"
                  >
                  </v-text-field>
                </v-responsive>
              </v-col>
              <v-spacer></v-spacer>
              <v-col lg='1' md='2' sm='3'>
                <v-btn class="primary">
                  <v-icon class="white--text" @click="search" >mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row >
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-card-text>
              <v-row wrap align='center' v-if="foundUser !== null">
                <v-col class="white pa-2" >
                  <v-responsive width="400" min-width="400">
                    <span v-text='foundUser'></span>
                  </v-responsive>
                </v-col>
                <v-spacer></v-spacer>
                <v-col lg='1' md='2' sm='3'>
                  <v-btn v-if='foundUser !== "Not Found"' @click='addUserToGroup' class="primary pa-2">
                    Add User
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
      descriptionLimit: 60,
      foundUser: null,
      isLoading: false,
      submitEmail: null,
    }),

    methods: {
      search() {
        axios.post('/search', {
          email: this.submitEmail
        }).then(resp => {
          if (resp.data.response.email !== null) {
            this.foundUser = resp.data.response.email
            this.submitEmail = null
          } else {
            this.submitEmail = null
            this.foundUser = 'Not Found'
          }
        }).catch(err => {
          console.log(err)
            this.submitEmail = null
            this.foundUser = 'Not Found'
        }).finally(() => (this.isLoading = false))
      },
      addUserToGroup() {
        console.log("up")
      }
    }
  }
</script>

<style scoped>

</style>
