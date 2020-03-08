<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="primary">Add New Recipe</v-btn>
    </template>
      <v-card>
        <v-card-title >
          <h2 class="font-weight-light mb-6">Add New Recipe</h2>
        </v-card-title>
        <v-card-text>
          <v-form 
            class="px-10" 
            ref="form"
            v-model="valid"
          >

            <v-text-field 
              label="Title" 
              v-model="title" 
              prepend-icon="mdi-format-title"
              required
              :counter="20"
              :rules="nameRules"
            />

            <v-textarea 
              label="Information" 
              v-model="content" 
              prepend-icon="mdi-lead-pencil"
              :rules="infoRules"
              :counter="120"
              required
            />

            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              max-width="290"
            >

              <template v-slot:activator="{ on }">
                <v-text-field
                  prepend-icon="mdi-calendar"
                  :value="computedDateFormattedMomentjs"
                  clearable
                  label="Date"
                  readonly
                  v-on="on"
                  @click:clear="date = null"
                  :rules="dateRules"
                  required
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date"
                @change="menu1 = false"
              ></v-date-picker>

            </v-menu>

            <v-btn 
              text 
              class="primary mt-10 mb-5" 
              @click="submit"
              :disabled="!valid"
            >
            Add Project
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      title: '',
      content: '',
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      valid: true,
      dialog: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      infoRules: [
        v => !!v || 'Information is required',
        v => (v && v.length <= 120) || 'Information must be less than 120 characters',
      ],
      dateRules: [
        v => !!v || 'Date is required',
      ],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        console.log(this.title, this.content, this.date)
        this.dialog = false
        this.title = ''
        this.content = ''
        this.$emit('projectAdded')
        this.resetValidation()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format(' MMMM Do YYYY') : ''
    },
  }
}
</script>
