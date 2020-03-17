<template>
  <div>
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
                <v-responsive width="400" min-width="200">
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
                  <v-responsive width="400" min-width="200">
                    <span v-text='foundUser'></span>
                  </v-responsive>
                </v-col>
                <v-spacer></v-spacer>
                <v-col lg='1' md='2' sm='3'>
                  <v-btn v-if='foundUser !== "Not Found"' @click='addUser' class="primary pa-2">
                    Add User
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-expand-transition>
        </v-card>

        <v-container fluid>
          <v-row dense justify="start">
            <v-col
              v-for="friend in friendsData.data.data"
              :key="friend.id"
              cols="auto"
              align-self="start"
            >
              <v-card max-width="300px" min-width='200px'>
                <v-img
                  :src="friend.avatar"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  width="200px"
                >
                  <v-card-title v-text="friend.name"></v-card-title>
                </v-img>
                <v-card-text v-text="friend.email"></v-card-text>
                <v-card-actions>
                  <v-btn color="primary">
                    View Recipes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        
      </div>
    </v-content>
  </v-app>
</div>
</template>

<script>
import axios from 'axios'
import SearchService from '../services/SearchService'
import { serverBus } from '../main'
import ImgurService from '../services/ImgurService'


export default {
  // name: "Group",
  data: () => ({
    descriptionLimit: 60,
    foundUser: null,
    isLoading: false,
    submitEmail: null,
    snackbarText: '',
    friendsData: [],
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
    addUser() {
      try {
        SearchService.addUserToGroup({
          email: this.foundUser
        }).then(resp => {
          this.snackbarText = resp.data.response
          this.getAllFriends()
          serverBus.$emit('snackBar', this.snackbarText)
        })
      } catch(err) {
        console.log(err)
      }
    },
    async getAllFriends() {
      try {
        const friends = await ImgurService.getAllFriends()
        this.friendsData = friends
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.getAllFriends()
  }
}
</script>

<style scoped>

</style>
