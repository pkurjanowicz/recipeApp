import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

export const serverBus = new Vue();
export const homePageRefresh = new Vue();

Vue.use(Vuetify)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

