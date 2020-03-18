<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
          >
            <v-card width="400px" height='300px'>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                
              >
                <v-card-actions style="float: right;">
                    <v-btn icon large color="primary">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <!-- <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions> -->
              <v-card-text v-text="card.description"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      cards: [
        { title: 'Pizza', src: 'https://www.washingtonpost.com/resizer/M-WnldvRmvg3qyWg0Om8ssM6E3M=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/UM4VXMMJ5Y7T5MPQALWPL73RGM.jpg', description: 'Delicious BBQ pizza, just what the doctor ordered '},
        { title: 'Salad', src: 'https://hips.hearstapps.com/del.h-cdn.co/assets/17/28/1499895456-greek-salad-delish.jpg', description: 'Succlent Salad, perfect to clean ya out'},
        { title: 'Mac and Cheese', src: 'https://www.dinneratthezoo.com/wp-content/uploads/2017/04/slow-cooker-mac-and-cheese-4-500x500.jpg', description: 'Extra cheese, dat queso blanco always comes correct'},
        { title: 'Pad Thai', src: 'https://hips.hearstapps.com/delish/assets/17/25/1498148145-delish-easy-pad-thai-horizontal-1024.jpg', description: 'Maybe in a different mood?'},
        { title: 'Sandwich', src: 'https://gbc-cdn-public-media.azureedge.net/img60136.768x512.jpg', description: 'Tried and true baby'},
        { title: 'Fried Chicken', src: 'https://s23991.pcdn.co/wp-content/uploads/fly-images/103786/batter-fried-chicken-recipe-fp-400x300-c.jpg', description: 'Because a yearly checkup is probably enough...'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
