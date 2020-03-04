import VenueTable from '../venues/venueTable/VenueTable.vue'

export default {
  data() {
    return {
      venues: [],
      userId: $cookies.get("loggedInUserId"),
      baseUrl: "http://localhost:4941/api/v1/",
    }
  },
  created() {
    this.getMyVenues()
  },
  methods: {
    getMyVenues() {
      let url = this.baseUrl + "venues";
      // url += "/?sortBy=STAR_RATING";
      url += "/?adminId=" + this.userId;
      return this.$http.get(url)
        .then(function (response) {
          this.venues = response.data;
          return response.data;
        }, function (error) {
          this.error = error;
          this.errorFlag = true;
        });
    }
  },
  components: {
    VenueTable
  }
}
