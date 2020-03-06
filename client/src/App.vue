<template>
  <div id="app">
    <v-app>
      <main>
        <v-container fluid>
          <router-link to="/">home</router-link>
          <v-spacer></v-spacer>
          <router-link to="/register">register</router-link>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'app',

}
</script>

