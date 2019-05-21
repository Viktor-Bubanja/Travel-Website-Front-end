import Reviews from '../reviews/Reviews.vue'
import UploadVenuePhoto from '../../uploadPhoto/UploadVenuePhoto.vue'
import VenueDetails from '../venueDetails/VenueDetails.vue'

export default {
  data() {
    return {
      userLocation: {},
      venues: [],
      unfilteredVenueTableData: [],
      currentPage: 1,
      rowsPerPage: 10,
      fields: {
        venueName: {
          sortable: false,
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
      this.formatVenueData(this.tableData);
    }
  },
  mounted() {
    this.formatVenueData(this.tableData);
  },
  computed: {
    numberRows() {
      return this.filteredVenueTableData.length;
    },
    filteredVenueTableData() {
      let filteredData = this.unfilteredVenueTableData;
      console.log(filteredData);
      if (this.filters) {
        if (this.filters.nameKeyword) {
          filteredData = filteredData.filter(
            item => item.venueName.toLowerCase().includes(this.filters.nameKeyword.toLowerCase()));
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
    expandAdditionalInfo(row) {
      row._showDetails = !row._showDetails;
    },
    formatVenueData: function (venues) {

      for (let i in venues) {
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
          venueData.primaryPhoto = venue.primaryPhoto;
          venueData._showDetails =  false;
          this.unfilteredVenueTableData.push(venueData);
        });
      }
    },
    reload() {
      document.location.reload();
    }
  },
  props: ['tableData', 'filters'],
  components: {
    Reviews,
    UploadVenuePhoto,
    VenueDetails
  }
}
