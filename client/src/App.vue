<template>
  <div id="app">
    <v-app>
      <main>
        <navBar v-if="navBarVisible"/>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import navBar from './components/navBar'

export default {
  name: 'app',
  // props:['navBarVisible'],
  data() {
    return {
      navBarVisible: true,
    }
  },
  components: {
    navBar
  },
  methods: {
    navBarCheck() {
      if (this.$route.path === '/login' || this.$route.path === '/register') {
        this.navBarVisible = false
      }
    }
  },
  beforeUpdate() {
    this.navBarCheck()
  },
  watch:{
    '$route' (to, from) {
      if (from.path === '/login' && to.path === '/') {
        this.navBarVisible = true
      } 
    }
  }
}
</script>

