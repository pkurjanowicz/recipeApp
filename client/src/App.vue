<template>
  <div id="app">
    <v-app>
      <main>
        <v-container fluid>
          <navBar v-if="navBarVisible"/>
          <router-view></router-view>

          {{navBarVisible}}
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import navBar from './components/navBar'

export default {
  name: 'app',
  data() {
    return {
      navBarVisible: true
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
  }
}
</script>

