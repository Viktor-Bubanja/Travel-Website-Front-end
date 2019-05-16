import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Venues from './components/venues/Venues'
import Venue from './components/venue/Venue.vue'
import 'vuetify/dist/vuetify.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import colors from 'vuetify/es5/util/colors'
import SignUp from './components/signUpForm/SignUpForm.vue'
import Login from './components/login/Login.vue'


import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueSlideBar from 'vue-slide-bar'
Vue.use(VueSlideBar);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import Vuetify from 'vuetify'
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    accent: colors.green.lighten1},
  iconfont: 'mdi'
});

Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/venues",
    component: Venues
  },
  {
    path: "/venues/:venueName",
    component: Venue
  },
  {
    path: "/signUp",
    component: SignUp
  },
  {
    path: "/login",
    component: Login
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

Vue.component('vue-slide-bar', VueSlideBar);


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

