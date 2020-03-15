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
      shrink-on-scroll
      prominent
      src="../assets/med-food-hero.jpg"
      max-width="100%"
    >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to bottom right, rgba(193, 66, 66, 0.9), rgba(25,32,72,0.8)"
      ></v-img>
    </template>
    <v-app-bar-nav-icon 
      @click.stop="drawer = !drawer" 
      text color="white"
      x-large 
      dark
    />
    
      <!-- <v-toolbar-title class="text-uppercase bold font-weight-black display-1">
        <span class="font-weight-light white--text">Recipe</span>
        <span class='white--text'>Tracker</span>
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-btn icon color="primary">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon color="primary">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-menu bottom left>
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
          <v-list-item
            v-for="(item, i) in dotMenu"
            :key="i"
            :to='item.route'
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item text mandatory color="primary" @click='logout'>
          <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-app-bar>

    <v-navigation-drawer app v-model='drawer' absolute temporary>
      <v-row  class="mt-5" >
        <v-col align="center">
            <v-avatar size="100">
              <!-- <img src="/pete.png"> -->
            </v-avatar>
            <p class="subtitle-2 mt-1">Pete Kurjanowicz</p>
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

export default {
  components: { 
    addRecipeModal
    },
  name: 'navbar',
  data() {
    return {
      drawer: false,
      drawerItems: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { text: 'Group', icon: 'mdi-account-group', route: '/group' },
      ],
      dotMenu: [
        { title: 'Profile', route: '/profile' },
      ],
      snackbar: false,
      snackbarText: '',
    }
  },
  methods: {
    logout() {
      axios.get('/logout').then(() => {
        this.$router.push('/login')
      })
    },
  },
  created() {
    serverBus.$on('snackBar', (text) => {
      this.snackbar = true
      this.snackbarText = text
    });
  }
}
</script>