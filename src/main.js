import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Venues from './components/venues/Venues.vue'
import Venue from './components/venue/Venue.vue'
import 'vuetify/dist/vuetify.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import colors from 'vuetify/es5/util/colors'
import SignUp from './components/signUpForm/SignUpForm.vue'
import Login from './components/login/Login.vue'
import EditProfile from './components/editProfile/EditProfile.vue'
import Profile from './components/viewProfile/Profile.vue'
import CreateVenue from './components/createVenue/CreateVenue.vue'
import MyVenues from './components/myVenues/MyVenues.vue'
import UploadPhoto from './components/uploadPhoto/UploadVenuePhoto.vue'

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

VueCookies.config('7d');

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
    redirect: "/venues",
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
  },
  {
    path: "/editProfile",
    component: EditProfile
  },
  {
    path: '/profile/:userId',
    component: Profile
  },
  {
    path: '/createVenue',
    component: CreateVenue
  },
  {
    path: '/myVenues',
    component: MyVenues
  },
  {
    path: '/uploadPhoto',
    component: UploadPhoto
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

