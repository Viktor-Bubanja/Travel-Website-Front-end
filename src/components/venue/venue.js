
export default {
  name: 'Venue',
  data() {
    return {
      baseUrl: "http://localhost:4941/api/v1/",
      venue: {},
      venueId: 1,
      error: "",
      errorFlag: false,
    }
  },
  created() {
    this.getVenue()
  },
  methods: {
    getVenue() {
      this.$http.get(this.baseUrl + 'venues/' + this.venueId)
        .then(function(response) {
          this.venue = response.data;
          console.log(response.data);
        }, function(error) {
          this.error = error;
          this.errorFlag = true;
        })
    }
  }
};
