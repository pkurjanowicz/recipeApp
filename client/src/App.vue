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
import axios from 'axios'

export default {
  name: 'app',
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
  mounted() {
    axios.get('/auth').then(resp => {
      if (resp.data.response === false) {
        this.$router.push('/login')
      }
    })
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

<style scoped>
.theme--light.v-application {
  background: #fcfbf5;
}

</style>

