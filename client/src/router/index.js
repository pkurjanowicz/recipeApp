import Vue from 'vue'
import VueRouter from 'vue-router';

/* this is creating all router paths. When a user lands on the path
vue router will load component(this corresponds with the file names 
  in "view" folder). Props are just data we want to pass to the 
  html. Note that these props aren't really used too often */
const routerOptions = [
  { path: '/', 
    component: 'Home', 
    },
  { path: '/register', 
    component: 'Register', 
  },
  { path: '/login', 
    component: 'Login', 
  },
  { path: '/group', 
    component: 'Group', 
  },
  { path: '/profile', 
    component: 'Profile', 
  },
  { path: '/recipe', 
    component: 'Recipe', 
  },
  { path: '/liked', 
    component: 'Liked', 
  },
]
/* this variable actually maps the 
route to the component in the views folder*/
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
  }
})
Vue.use(VueRouter)

/* this creates an instance 
of vuerouter and exports it. 
This is used in the navBar.vue 
file in the component folder*/ 
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router

// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from '../views/Home'
// import Register from '../views/Register'

// Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: Register
//     }
//   ]
// })