<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn 
        text 
        v-on="on" 
        class="secondary" 
        :disabled="!valid" 
        @click="searchAccount()"
      >
        Search Account Email
      </v-btn>
    </template>
      <v-card>
        <v-card-title >
          <h2 class="font-weight-light mb-6">Results</h2>
        </v-card-title>
        <v-card-text>
          <v-btn 
            text 
            class="secondary mt-10 mb-5" 
            @click="submit"
          >
            Add Friend
          </v-btn>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import searchService from '../services/SearchService'

export default {
  name: 'searchResultsModal',
  props: ['searchEmail'],
  data() {
    return {
      dialog: false,
      valid: true,
    }
  },
  methods: {
    submit() {
      console.log('Friend added')
    },
    async searchAccount() {
      try {
          await SearchService.search({
          email : this.searchEmail,
        })
        this.error = null
        this.searchEmail = ''
      } catch (error){
        this.error = error.response.data.error
        this.success = null
      }
    }
  },
}
</script>