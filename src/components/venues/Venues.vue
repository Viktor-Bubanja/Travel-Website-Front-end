<template>
  <div>
    <div v-if = "errorFlag" style = "color: red;">
      {{ error }}
    </div>
    <div>
      <v-app>
        <v-container>
        <v-flex>
        <v-card id="venues">
          <v-card-title class="headline font-weight-regular blue-grey white--text">Browse Venues</v-card-title>
          <v-subheader class="pa-0">Choose a city to explore</v-subheader>
          <v-autocomplete
            v-model="filters.cityKeyword"
            :items="cities"
          ></v-autocomplete>
          <div>
            <div class="text-right">
              <b-button v-b-toggle.filters class="button" size="lg">Filters</b-button>
            </div>
            <b-collapse id="filters" class="mt-2">
              <b-card>
                <b-form-group>
                  <b-input-group>
                    <b-form-input v-model="filters.nameKeyword"
                                  placeholder="Search by name"
                                  size="lg"
                                  type="text"
                                  class="col-xs-2"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    v-model="filters.categoryKeyword"
                    :items="this.categories"
                    label="Category"
                  ></v-select>
                </v-flex>
                <v-subheader class="pl-0">Minimum star rating</v-subheader>
                <v-slider
                  v-model="filters.starRatingSliderValue"
                  :min="1"
                  :max="5"
                  :tick-labels="starSliderTickValues"
                ></v-slider>
                <v-subheader class="pl-0">Maximum cost rating</v-subheader>
                <v-slider
                  v-model="filters.costRatingSliderValue"
                  :min="0"
                  :max="4"
                  :tick-labels="costSliderTickValues"
                ></v-slider>
              </b-card>
            </b-collapse>
          </div>
          <VenueTable @venue-updated="getVenues" :tableData="venues" :filters="filters"></VenueTable>
        </v-card>
        </v-flex>
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script src="./venues.js"></script>

<style lang="css" scoped>
  #venues {
    align-self: center;
    padding: 20px;
    background: snow;
  }
  #module {
    width: 500px;
    font-size: 14px;
    line-height: 1.5;
  }
  .button {
    background-color: white;
    color: black;
  }
  thumbnail {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
  }
  img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
</style>




