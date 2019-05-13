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
          <v-card-title class="headline font-weight-regular blue-grey white--text">Venues</v-card-title>
          <v-subheader class="pa-0">Choose a city to explore</v-subheader>

          <v-autocomplete
            v-model="cityKeyword"
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
            :fields="this.fields"
            @row-clicked="rowClickedHandler">
            <template slot="show_details" slot-scope="row">
              <b-img-lazy
                thumbnail
                fluid
                src="https://picsum.photos/250/250/?image=54"
                alt="Image 1"
              ></b-img-lazy>

            </template>
          </b-table>
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
  .button {
    background-color: white;
    color: black;
  }
</style>




