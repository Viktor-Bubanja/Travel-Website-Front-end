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

                <div id="module" class="container">
                  <p>sdfsdfsdfsd</p>
                  <p class="collapse" id="collapseExample" aria-expanded="false">
                    dfsdfsdfsdsdfsdf
                  </p>
                  <a role="button" class="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  </a>
                </div>

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
                  alt="Image 1"></b-img-lazy>
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
                        <!--<b-carousel-->
                          <!--id="carousel-1"-->
                          <!--v-model="slide"-->
                          <!--:interval="4000"-->
                          <!--controls-->
                          <!--indicators-->
                          <!--background="#ababab"-->
                          <!--img-width="1024"-->
                          <!--img-height="480"-->
                          <!--style="text-shadow: 1px 1px 2px #333;"-->
                          <!--@sliding-start="onSlideStart"-->
                          <!--@sliding-end="onSlideEnd"-->
                        <!--&gt;-->
                          <!--<b-carousel-slide-->
                            <!--img-src="https://picsum.photos/1024/480/?image=52"-->
                          <!--&gt;</b-carousel-slide>-->

                          <!--<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">-->
                          <!--</b-carousel-slide>-->

                          <!--<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>-->

                          <!--<b-carousel-slide>-->
                            <!--<img-->
                              <!--src="https://picsum.photos/1024/480/?image=55"-->
                            <!--&gt;-->
                          <!--</b-carousel-slide>-->

                          <!--<b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">-->
                            <!--<p>-->
                              <!--Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt-->
                              <!--a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.-->
                            <!--</p>-->
                          <!--</b-carousel-slide>-->
                        <!--</b-carousel>-->

                        <!--<p class="mt-4">-->
                          <!--Slide #: {{ slide }}<br>-->
                          <!--Sliding: {{ sliding }}-->
                        <!--</p>-->

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
                        <div class="carousel-item" v-for="(photo,idx) in row.item.photos" :class="{ active: idx==0 }">
                          <img :src="baseUrl + 'venues/' + row.item.venueId + '/photos/' + photo.photoFilename" alt="" class="img-fluid">
                        </div>
                        </b-carousel>
                      </div>

                    </b-tab>




                    <b-tab title="Reviews">
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
</style>




