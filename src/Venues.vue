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
        cities: ['', 'New Zealand', 'England', 'Christchurch'],
        selected: "",
        baseUrl: "http://localhost:4941/api/v1/",
        nameKeyword: "",
        categoryKeyword: "",
        categories: [],
        starRatingSliderValue: 0
      }
    },
    computed: {
      filteredVenueTableData() {
        let filteredData = this.unfilteredVenueTableData;

        if (this.nameKeyword) {
          filteredData = filteredData.filter(item => item.name.toLowerCase().includes(this.nameKeyword.toLowerCase()));
        }

        if (this.categoryKeyword) {
          filteredData = filteredData.filter(item => item.category.toLowerCase() === this.categoryKeyword.toLowerCase());
        }

        filteredData = filteredData.filter(item => item.starRating > this.starRatingSliderValue);

        return filteredData;


        // return (this.nameKeyword || this.categoryKeyword)
        //   ? this.unfilteredVenueTableData.filter(item =>
        //     item.name.toLowerCase().includes(this.nameKeyword.toLowerCase()) &&
        //     item.category.toLowerCase() === this.categoryKeyword.toLowerCase()
        //   ) : this.unfilteredVenueTableData
      }
    },
    mounted() {
        this.generateTable();
        this.getCategories();
    },
    methods: {
      getVenues: function () {
        let url = this.baseUrl + "venues/";
        if (this.selected !== "") {
          url += "?city=" + this.selected;
        }
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
        console.log("here are data");
        console.log(data);
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
      generateTable: function () {
        this.getVenues()
          .then((venues) => {
            this.unfilteredVenueTableData = [];
            for (var i = 0; i < this.venues.length; i++) {
              let url = this.baseUrl + "venues/" + this.venues[i].venueId;
              let venueData = {};
              let venue = this.venues[i];

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
          });

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
<template>

  <div>
    <div v-if = "errorFlag" style = "color: red;">
      {{ error }}
    </div>
    <div id="venues">

      <v-app>
        <v-container>
        <v-flex>
        <v-card>
          <v-card-title class="headline font-weight-regular blue-grey white--text">Venues</v-card-title>
          <v-subheader class="pa-0">Choose a city to explore</v-subheader>

          <v-autocomplete
            v-model="selected"
            :items="cities"
            prepend-icon="mdi-city"
          ></v-autocomplete>
          <v-card-actions class="justify-center">
            <v-btn large flat color="green" v-on:click="generateTable()">Search</v-btn>
          </v-card-actions>

          <div>
            <b-button v-b-toggle.collapse-1 variant="primary">Filters</b-button>
            <b-collapse id="collapse-1" class="mt-2">
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
                <VueSlideBar
                  v-model="this.starRatingSliderValue"
                  :min="0"
                  :max="5">
                </VueSlideBar>
              </b-card>
            </b-collapse>
          </div>


          <b-table
            hover
            :items="this.filteredVenueTableData"
            :fields="this.fields">
          </b-table>


        </v-card>
        </v-flex>
        </v-container>
      </v-app>


      <button type="button" class="btn btn-primary"
              v-on:click="getVenues()">
        Search Venues
      </button>
    </div>
  </div>
</template>





