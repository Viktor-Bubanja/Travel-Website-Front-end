<script xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  import * as objArray from "vue-resource";

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
        rowsPerPage: 10
      }
    },
    computed: {
      numberRows() {
        return this.venues.length;
      },
      cities() {
        let cities = this.venues.map(a => a.city)
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
          console.log(filteredData);
          filteredData = filteredData.filter(item => item.city.toLowerCase() === this.cityKeyword.toLowerCase());
        }

        filteredData = filteredData.filter(item => item.starRating >= this.starRatingSliderValue);
        filteredData = filteredData.filter(item => item.costRating <= this.costRatingSliderValue);

        return filteredData;
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
                venueData.starRating = venue.meanStarRating;
                venueData.costRating = venue.modeCostRating;
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
      }
    }
  }
</script>

<template class="background">

  <div>
    <div v-if = "errorFlag" style = "color: red;">
      {{ error }}
    </div>
    <div>
      <v-app>
        <v-container>
        <v-flex>
        <v-card id="venues">
          <v-card-title class="headline font-weight-regular blue-grey white--text">Venues</v-card-title>
          <v-subheader class="pa-0">Choose a city to explore</v-subheader>

          <v-autocomplete
            v-model="cityKeyword"
            :items="cities"
            prepend-icon="mdi-city"
          ></v-autocomplete>

          <div>
            <div class="text-right">
              <b-button v-b-toggle.filters class="button" size="lg">Filters</b-button>
            </div>
            <b-collapse id="filters" class="mt-2">
              <b-card>
                <b-form-group>
                  <b-input-group>
                    <b-form-input v-model="nameKeyword"
                                  placeholder="Search"
                                  size="lg"
                                  type="text"
                                  class="col-xs-2"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button :disabled="!nameKeyword" @click="nameKeyword = ''">Clear</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    v-model="categoryKeyword"
                    :items="this.categories"
                    label="Category"
                  ></v-select>
                </v-flex>

                <v-slider
                  v-model="starRatingSliderValue"
                  :max="5"
                  :tick-labels="sliderTickValues"
                ></v-slider>

                <v-slider
                  v-model="costRatingSliderValue"
                  :max="5"
                  :tick-labels="sliderTickValues"
                ></v-slider>

              </b-card>
            </b-collapse>
          </div>


          <b-pagination
            v-model="currentPage"
            :total-rows="numberRows"
            :per-page="rowsPerPage"
            aria-controls="venue-table"
          ></b-pagination>

          <b-table
            id="venue-table"
            hover
            :items="this.filteredVenueTableData"
            :per-page="rowsPerPage"
            :current-page="currentPage"
            :fields="this.fields">
          </b-table>


        </v-card>
        </v-flex>
        </v-container>
      </v-app>

    </div>
  </div>
</template>


<style lang="css" scoped>
  #venues {
    align-self: center;
    padding: 20px;
    background: snow;
  }
  .button {
    background-color: white;
    color: black;
  }
</style>




