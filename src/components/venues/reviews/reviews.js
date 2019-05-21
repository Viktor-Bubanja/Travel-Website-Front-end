import Review from './Review.vue'
import AddReview from './AddReview.vue'

export default {
  data() {
    return {
      userIsLoggedIn: false
    }
  },
  props: ['reviews', 'venueId'],
  methods: {
    checkUserLoggedIn() {
      this.userIsLoggedIn = localStorage.getItem("auth") !== null;
    }
  },
  components: {
    Review,
    AddReview
  }
}
