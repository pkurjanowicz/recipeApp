<template>
  <v-app>
    <v-content>
      <div class="Group">
        <v-card
    color="primary"
    dark
  >
    <v-card-title class="primary">
      Find Friends
    </v-card-title>
    <v-card-text>
    <v-row align='center' wrap>
      <v-col lg='11' md='10' sm="9">
        <v-responsive min-width="400">
          <v-text-field
            prepend-icon="mdi-account-search"
            v-model="submitEmail"
            label="Search friends by email"
          >
          </v-text-field>
        </v-responsive>
      </v-col>
      <v-spacer></v-spacer>
      <v-col lg='1' md='2' sm='3'>
        <v-btn color="white">
          <v-icon class="black--text" @click="search">mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="foundUser !== '' || foundUser !== 'not found'" class="secondary">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>User Found!</v-list-item-title>
            <span v-text='foundUser'></span>
          </v-list-item-content>
          <v-btn @click='addUserToGroup'>
            Add User
          </v-btn>
        </v-list-item>
      </v-list>
      <v-list v-if="foundUser === 'not found'" class="secondary">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>User Not Found!</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
      foundUser: '',
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
            this.foundUser = 'not found'
          }
        }).catch(err => {
          console.log(err)
            this.foundUser = 'not found'
        }).finally(() => (this.isLoading = false))
      }
    }
  }
</script>

<style scoped>

</style>
