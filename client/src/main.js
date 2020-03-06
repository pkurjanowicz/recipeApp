import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   vuetify,
//   components: { App },
//   template: '<App/>'
// })
