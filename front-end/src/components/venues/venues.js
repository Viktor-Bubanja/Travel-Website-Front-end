import VenueTable from './venueTable/VenueTable.vue'

export default {
  data() {
    return {
      isEditing: false,
      error: "",
      errorFlag: false,
      venues: [],
      category: "",
      model: null,
      baseUrl: "http://localhost:4941/api/v1/",
      categories: [],
      starSliderTickValues: ['1', '2', '3', '4', '5'],
      costSliderTickValues: ['Free', '$', '$$', '$$$', '$$$$'],
      selectedRow: "",
      filters: {
        cityKeyword: "",
        nameKeyword: "",
        categoryKeyword: "",
        starRatingSliderValue: 0,
        costRatingSliderValue: 5
      }
    }
  },
  computed: {
    cities() {
      let cities = this.venues.map(a => a.city);
      cities.unshift("");
      return cities;
    },
  },
  created() {
    this.initialise()
  },
  methods: {
    initialise: function() {
      this.getVenues();
      this.getCategories();
    },
    getVenues: function () {
      console.log("called");
      let url = this.baseUrl + "venues";
      url += "/?sortBy=STAR_RATING";
      this.$http.get(url)
        .then(function (response) {
          this.venues = response.data;
        }, function (error) {
          this.error = error;
          this.errorFlag = true;
        });
    },
    getCategories() {
      this.$http.get(this.baseUrl + 'categories')
        .then(function (response) {
          this.categories = response.body.map(a => a.categoryName);
          this.categories.unshift("");
        }, function (error) {
          this.error = error;
          this.errorFlag = true;
        });
    },
    getPrimaryPhoto(photos) {
      for (let i = 0; i < photos.length; i++) {
        if (photos[i].isPrimary === true) {
          return photos[i].photoFilename;
        }
      }
    },
  },
  components: {
    VenueTable
  }
}
