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
  created() {
    this.getReviews()
  },
  methods: {
    hideModal() {
      this.$refs['add-review-modal'].hide()
    },
    reviewSubmittedHandler() {
      this.hideModal();
      this.getReviews();
    },
    checkUserLoggedIn() {
      this.userIsLoggedIn = localStorage.getItem("auth") !== null;
    },
    getReviews() {
      this.$http.get(this.baseUrl + 'venues/' + this.venueId + '/reviews')
        .then((response) => {
          this.reviews = response.body;
          console.log("review");
          console.log(this.reviews);
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
