<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="primary">View Photos</v-btn>
    </template>
      <v-card v-if="images.length > 0">
        <template>
          <v-carousel>
            <v-carousel-item
              v-for="(image,i) in images"
              :key="i"
              :src="image.photo"
            >
            <v-list two-line>
              <v-list-item-content class="ml-4">
                <v-list-item-title>By: {{image.writer}}</v-list-item-title>
              </v-list-item-content>
            </v-list>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-card>
      <v-card v-else height="300px">
        <v-card-title>
          No photos yet
        </v-card-title>
      </v-card>
  </v-dialog>
</template>

<script>
import AdditionalPhotoService from '../services/AdditionalPhotosService'

export default {
  data() {
    return {
      dialog: false,
      images: "",
    }
  },
  methods: {
    async getAllPhotosById() {
      const urlParams = new URLSearchParams(window.location.search);
      try {
        const response = await AdditionalPhotoService.getAllPhotosById({
          id: urlParams.get('id')
        })
        this.images = response.data.success
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    dialog() {
      this.getAllPhotosById()
    }
  },
}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>