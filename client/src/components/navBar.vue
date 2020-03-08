<template>
  <nav>

    <v-snackbar v-model="snackbar" :timeout="4000" top color="primary">
      <span>Project Added</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-app-bar flat app class="grey lighten-4">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" text color="primary"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light primary--text">Recipe</span>
        <span class='primary--text'>App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click='logout'>
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model='drawer' absolute temporary>
      <v-row  class="mt-5" >
        <v-col align="center">
            <v-avatar size="100">
              <!-- <img src="/pete.png"> -->
            </v-avatar>
            <p class="subtitle-2 mt-1">Pete Kurjanowicz</p>
            <div class="mt-4">
              <addRecipeModal 
                @projectAdded="snackbar = true"
              />
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
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import addRecipeModal from './addRecipeModal'
import axios from 'axios'

export default {
  components: { addRecipeModal },
  name: 'navbar',
  data() {
    return {
      drawer: false,
      drawerItems: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { text: 'My Profile', icon: 'mdi-account', route: '/profile' },
      ],
      snackbar: false,
    }
  },
  methods: {
    logout() {
      axios.get('/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>