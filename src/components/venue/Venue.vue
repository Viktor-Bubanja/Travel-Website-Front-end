<template>
  <div id="app">
    <v-app id="inspire">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-img
              class="white--text"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline" v-text="venue.venueName"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text" v-text="venue.venueName"></span><br>
                <span v-text="venue.shortDescription"></span><br>
                <div class="text-right">
                  <b-button v-b-toggle.filters class="button">Full description</b-button>
                </div>
                <b-collapse id="filters" class="mt-2">
                  <b-card :title="venue.longDescription"></b-card>
                </b-collapse>


              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script src="./venue.js"></script>
