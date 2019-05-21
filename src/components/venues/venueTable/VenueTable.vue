<template>
  <div>
  <b-pagination
    v-model="currentPage"
    :total-rows="numberRows"
    :per-page="rowsPerPage"
    aria-controls="venue-table"
  ></b-pagination>
  <b-table
    id="venue-table"
    hover
    :items="filteredVenueTableData"
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
            <Reviews :reviews="row.item.reviews" :venueId="row.item.venueId"></Reviews>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
  </b-table>
  </div>
</template>

<script src="./venueTable.js"></script>
