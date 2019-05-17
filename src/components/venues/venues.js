
export default {
  data() {
    return {
      venueData: [],
      unfilteredVenueTableData: [],
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
      isEditing: false,
      error: "",
      errorFlag: false,
      venues: [],
      category: "",
      model: null,
      baseUrl: "http://localhost:4941/api/v1/",
      cityKeyword: "",
      nameKeyword: "",
      categoryKeyword: "",
      categories: [],
      starRatingSliderValue: 0,
      costRatingSliderValue: 5,
      sliderTickValues: ['0', '1', '2', '3', '4', '5'],
      currentPage: 1,
      rowsPerPage: 10,
      selectedRow: ""
    }
  },
  mounted() {
    $('.carousel').carousel();
  },
  computed: {
  photosTwo() {
    console.log("DFGSDFG");
    let photos = ['<div class="example-slide">Slide 1</div>',
    '<div class="example-slide">Slide 2</div>',
    '<div class="example-slide">Slide 3</div>'];
    return photos;
  },
    numberRows() {
      return this.filteredVenueTableData.length;
    },
    cities() {
      let cities = this.venues.map(a => a.city);
      cities.unshift("");
      return cities;
    },
    filteredVenueTableData() {
      let filteredData = this.unfilteredVenueTableData;

      if (this.nameKeyword) {
        filteredData = filteredData.filter(item => item.name.toLowerCase().includes(this.nameKeyword.toLowerCase()));
      }

      if (this.categoryKeyword) {
        filteredData = filteredData.filter(item => item.category.toLowerCase() === this.categoryKeyword.toLowerCase());
      }

      if (this.cityKeyword) {
        filteredData = filteredData.filter(item => item.city.toLowerCase() === this.cityKeyword.toLowerCase());
      }

      filteredData = filteredData.filter(item => item.starRating >= this.starRatingSliderValue);
      filteredData = filteredData.filter(item => item.costRating <= this.costRatingSliderValue);

      return filteredData;
    },
    photos() {
      let photoLinks = ["https://picsum.photos/1024/480/?image=52",
      "https://picsum.photos/1024/480/?image=54",
      "https://picsum.photos/1024/480/?image=55"];
      return photoLinks;

    }

  },
  created() {
    this.initialise()
  },
  methods: {
    initialise: function() {
      this.getVenues()
        .then((venues) => {
            this.generateTable(venues);
          }
        );
      this.getCategories();
    },
    rowClickedHandler: function(one, two, three) {
      console.log(one);
    },
    getVenues: function () {
      let url = this.baseUrl + "venues";
      url += "/?sortBy=STAR_RATING";
      return this.$http.get(url)
        .then(function (response) {
          this.venues = response.data;
          return response.data;
        }, function (error) {
          this.error = error;
          this.errorFlag = true;
        });
    },
    getVenuePhoto: function (venueId, data) {
      var photoName = "";

      var photos = data.photos;
      for (var i = 0; i < photos.length; i++) {
        if (photos[i].isPrimary == true) {
          photoName = photos[i].photoFilename;
          this.$http.get(this.baseUrl + "venues/" + venueId + '/photos/' + photoName)
            .then(function (response) {
              return response;
            })
        }
      }
      return "photo";
    },
    generateTable: function (venues) {
      this.unfilteredVenueTableData = [];
      for (var i = 0; i < venues.length; i++) {
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
          // venueData.photo = this.getVenuePhoto(venue.venueId, data);
          venueData.name = data.venueName;
          venueData.city = data.city;
          venueData.category = data.category.categoryName;
          venueData.shortDescription = data.shortDescription;
          venueData.longDescription = data.longDescription;
          venueData.admin = data.admin.username;
          venueData.photos = data.photos;
          venueData.starRating = venue.meanStarRating;
          venueData.costRating = venue.modeCostRating;
          venueData.venueId = venue.venueId;


          this.unfilteredVenueTableData.push(venueData);
        });
      }
    },
    getCategories() {
      this.$http.get(this.baseUrl + 'categories')
        .then(function (response) {
          this.categories = response.data.map(a => a.categoryName);
          this.categories.unshift("");
        }, function (error) {
          this.error = error;
          this.errorFlag = true;
        });
    },
    getVenuePhotos(venueId, photoData) {
        let photos = [];
        console.log("here");
        console.log("venueId: " + venueId);
        console.log("photoData: " + photoData);
        for (let i = 0; i < photoData.length; i++) {
          let url = this.baseUrl + 'venues/' + venueId + '/photos/' + photoData[i].photoFilename;
          console.log(url);
          this.$http.get(url)
            .then(function (response) {
              photos.push(response.data);
            }, function (error) {
              this.error = error;
              this.errorFlag = true;
            })
        }
        return photos;
    }
  }
}
