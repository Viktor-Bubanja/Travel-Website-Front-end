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
                                  placeholder="Search by name"
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
                <v-subheader class="pl-0">Minimum star rating</v-subheader>
                <v-slider
                  v-model="starRatingSliderValue"
                  :min="1"
                  :max="5"
                  :tick-labels="starSliderTickValues"
                ></v-slider>

                <v-subheader class="pl-0">Maximum cost rating</v-subheader>
                <v-slider
                  v-model="costRatingSliderValue"
                  :min="0"
                  :max="4"
                  :tick-labels="costSliderTickValues"
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

              <template slot="show_details" slot-scope="row">
<!--                <img :src="baseUrl + 'venues/' + row.item.venueId + '/photos/' + row.item.primaryPhoto" alt="Forest" 2 onclick="row.toggleDetails">-->
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">Details
                </b-button>
              </template>

              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-tabs card>
                    <b-tab title="Info" active>
                      <b-card>
                        <h4>About {{ row.item.name }}</h4>

                        <div align="right">
                          <p>Category: {{ row.item.category}}</p>
                          <p>Admin: {{ row.item.admin}}</p>
                        </div>
                      </b-card>

                    </b-tab>
                    <b-tab title="Photos">
                      <div>
                        <b-carousel
                          controls
                          indicators
                          background="#ababab"
                          img-width="1024"
                          img-height="480"
                          style="text-shadow: 1px 1px 2px #333;"
                          @sliding-start="0"
                          @sliding-end="2"
                        >
<!--                        <div class="carousel-item" v-for="(photo,idx) in row.item.photos" :class="{ active: idx==0 }">-->
<!--                          <img :src="baseUrl + 'venues/' + row.item.venueId + '/photos/' + photo.photoFilename" class="img-fluid">-->
<!--                        </div>-->
                        </b-carousel>
                      </div>
                    </b-tab>
                    <b-tab title="Reviews">
                      <ul>
                        <li v-for="review in row.item.reviews">
                          <v-card>
                            <p>{{review}}</p>
                            <p>{{review.reviewBody}}</p>
                            <p>Star rating: {{ review.starRating }}</p>
                            <p>Cost rating: {{ review.costRating }}</p>
                            <p>Author: {{ review.reviewAuthor.username }}</p>
                            <p></p>
                          </v-card>
                        </li>
                      </ul>
                    </b-tab>
                  </b-tabs>
                </b-card>
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
  #module {
    width: 500px;
    font-size: 14px;
    line-height: 1.5;
  }

  #module a.collapsed:after  {
    content: '+ Show More';
  }

  #module a:not(.collapsed):after {
    content: '- Show Less';
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




