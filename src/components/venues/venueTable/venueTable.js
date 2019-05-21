import Reviews from '../reviews/Reviews.vue'

export default {
  data() {
    return {
      venues: [],
      unfilteredVenueTableData: [],
      currentPage: 1,
      rowsPerPage: 10,
      fields: {
        name: {
          sortable: false
        },
        city: {
          sortable: false
        },
        category: {
          sortable: false
        },
        starRating: {
          sortable: true,
          initial_sort: true
        },
        costRating: {
          sortable: true
        },
        show_details: {
          sortable: false
        }
      },
      baseUrl: "http://localhost:4941/api/v1/",
    }
  },
  watch: {
    tableData(){
      this.retrieveFullVenueData(this.tableData);
    }
  },
  mounted() {
    this.retrieveFullVenueData(this.tableData);
  },
  computed: {
    numberRows() {
      return this.venues.length;
    },
    filteredVenueTableData() {
      let filteredData = this.unfilteredVenueTableData;
      if (this.filters) {
        if (this.filters.nameKeyword) {
          filteredData = filteredData.filter(
            item => item.name.toLowerCase().includes(this.filters.nameKeyword.toLowerCase()));
        }
        if (this.filters.categoryKeyword) {
          filteredData = filteredData.filter(
            item => item.category.toLowerCase() === this.filters.categoryKeyword.toLowerCase());
        }
        if (this.filters.cityKeyword) {
          filteredData = filteredData.filter(
            item => item.city.toLowerCase() === this.filters.cityKeyword.toLowerCase());
        }
        filteredData = filteredData.filter(
          item => item.starRating >= this.filters.starRatingSliderValue);
        filteredData = filteredData.filter(
          item => item.costRating <= this.filters.costRatingSliderValue);
      }
      return filteredData;
    }
  },
  methods: {
    getReviews(venueId) {
      return this.$http.get(this.baseUrl + 'venues/' + venueId + '/reviews');
    },
    retrieveFullVenueData: function (venues) {
      console.log("venue table");
      console.log(venues);
      for (let i = 0; i < venues.length; i++) {
        let url = this.baseUrl + "venues/" + venues[i].venueId;
        let venueData = {};
        let venue = venues[i];

        this.$http.get(url)
          .then(function (response) {
            return response.data;
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          }).then(function(data) {
          venueData = data;
          venueData.category = venueData.category.categoryName;
          venueData.starRating = venue.meanStarRating !== null ? venue.meanStarRating : 3;
          venueData.costRating = venue.modeCostRating !== null ? venue.modeCostRating : 0;
          venueData.venueId = venue.venueId;
          this.getReviews(venue.venueId)
            .then(function(response) {
              venueData.reviews = response.body;
              for (let i in venueData.reviews) {
                let date = new Date(venueData.reviews[i].timePosted);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                if (dt < 10) {
                  dt = '0' + dt;
                }
                if (month < 10) {
                  month = '0' + month;
                }
                venueData.reviews[i].timePosted = dt + '/' + month + '/' + year;
              }
            }, function(error) {
              this.error = error;
              this.errorFlag = true;
            });
          this.unfilteredVenueTableData.push(venueData);
        });
      }

    }
  },
  props: ['tableData', 'filters'],
  components: {
    Reviews
  }
}
