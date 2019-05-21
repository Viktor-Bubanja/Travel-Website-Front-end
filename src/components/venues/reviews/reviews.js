import Review from './Review.vue'
import AddReview from './AddReview.vue'

export default {
  data() {
    return {
      reviews: [],
      userIsLoggedIn: false,
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  watch: {
    $route(to, from) {
      this.checkUserLoggedIn();
    }
  },
  created() {
    this.getReviews()
  },
  mounted() {
    this.checkUserLoggedIn()
  },
  methods: {
    hideModal() {
      // this.$refs['add-review-modal'].hide()
      this.$bvModal.hide('add-review-modal');
    },
    reviewSubmittedHandler() {
      this.hideModal();
      this.getReviews();
    },
    checkUserLoggedIn() {
      this.userIsLoggedIn = $cookies.get("auth") !== null;
    },
    getReviews() {
      this.$http.get(this.baseUrl + 'venues/' + this.venueId + '/reviews')
        .then((response) => {
          this.reviews = response.body;
        }, (error) => {
          console.log(Error);
        });
    }
  },
  props: ['venueId'],
  components: {
    Review,
    AddReview
  }
}
