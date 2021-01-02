<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="white" max-width="100%">
      <span class="black--text">{{snackbarText}}</span>
      <v-btn text color="black" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app-bar 
      flat 
      app 
      class="grey lighten-4"
      max-width="100%"
      color="white"
    >

    <v-app-bar-nav-icon 
      @click.stop="drawer = !drawer" 
      text color="black"
      x-large 
      dark
    />

    
      <v-toolbar-title 
        class="text-uppercase bold font-weight-black text-h5 flex text-center"
        >
        <router-link 
          to="/"
          style="text-decoration: none; color: inherit;"
        >
        <span class="primary--text">Healthfood</span>
        <span class='font-weight-light primary--text '>Sponsors</span>
        </router-link>
      </v-toolbar-title>


      <v-btn icon color="primary" @click="goToLikedPage()">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-menu bottom left >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item
            v-for="(item, i) in dotMenu"
            :key="i"
            :to='item.route'
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item> -->
          <v-list-item text mandatory color="primary" @click='logout'>
          <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-app-bar>

    <v-navigation-drawer app v-model='drawer' temporary v-if="drawer === true" >
      <v-row  class="mt-5">
        <v-col align="center">
            <v-avatar size="100">
              <img :src="profileData.avatar">
            </v-avatar>
            <p class="subtitle-2 mt-1">{{name}}</p>
            <div class="mt-4">
              <addRecipeModal />
            </div>
        </v-col>
      </v-row>
      <v-list flat>
          <v-list-item-group flat mandatory color="primary">
            <v-list-item v-for="(item, i) in drawerItems" :key="i" router :to='item.route'>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text" ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item text mandatory color="primary" @click="goToLikedPage()">
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Liked</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <!-- <v-list-item text mandatory color="primary" @click='logout'>
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>      

  </nav>
</template>



<script>
import addRecipeModal from './addRecipeModal'
import axios from 'axios'
import { serverBus } from '../main';
import ImgurService from '../services/ImgurService'

export default {
  components: { 
    addRecipeModal
    },
  name: 'navbar',
  data() {
    return {
      drawer: false,
      drawerItems: [
        { text: 'Home', icon: 'mdi-home', route: '/' },
        { text: 'Friends', icon: 'mdi-account-group', route: '/group' },
        { text: 'Profile', icon: 'mdi-account', route: '/profile' },
      ],
      dotMenu: [
        { title: 'Profile', route: '/profile' },
      ],
      snackbar: false,
      snackbarText: '',
      profileData: null,
      name: '',
    }
  },
  methods: {
    logout() {
      axios.get('/logout').then(() => {
        this.$router.push('/login')
      })
    },
    async getProfileData() {
      try {
        const response = await ImgurService.getProfileData()
        this.profileData = response.data
        if (response.data.name === null) {
          this.name = "Input Your Name"
        } else {
          this.name = response.data.name
        }
      } catch (err) {
        console.log(err)
      }
    },
    goToLikedPage() {
      this.$router.push("/liked")
    },
    goToHomePage() {
      this.$router.push("/")
    }
  },
  created() {
    serverBus.$on('snackBar', (text) => {
      this.snackbar = true
      this.snackbarText = text
    });
  },
  mounted() {
    this.getProfileData()
  },
  watch: {
    'drawer'(newVal, oldVal) {
      if (oldVal === false) {
        this.getProfileData()
      }
    }
  }
}
</script>