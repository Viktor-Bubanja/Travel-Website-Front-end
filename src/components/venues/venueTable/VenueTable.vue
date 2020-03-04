<template xmlns:v-img="http://www.w3.org/1999/xhtml">
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
    @row-clicked="expandAdditionalInfo"
    :fields="this.fields">
    <template slot="venueName" slot-scope="row">
      <p v-b-tooltip.hover title="Click for more information">{{row.item.venueName}}</p>
    </template>
    <template slot="show_details" slot-scope="row">
      <img v-if="row.item.photos.length === 0"
           src="../../../assets/default_photo.png"
           style="height:90px;width:100px;"
           alt="Default photo"
           >
      <img v-else :src="baseUrl + 'venues/' + row.item.venueId + '/photos/' + row.item.primaryPhoto"
           style="height:100px;width:100px;"
           alt="Primary photo"
      >
    </template>
    <template slot="row-details" slot-scope="row">
      <b-card>
        <b-tabs card>
          <b-tab title="Info" active>
            <VenueDetails :venueDetails=row.item></VenueDetails>
          </b-tab>
          <b-tab title="Photos">
            <b-row>
              <b-button :disabled="(row.item.admin.userId.toString() !== $cookies.get('loggedInUserId').toString())"
                        v-b-modal.upload-photo-modal>
                Upload Photo
              </b-button>
            </b-row>
            <b-modal @hide="reload" id="upload-photo-modal" title="Upload Photo" hide-footer>
              <UploadVenuePhoto :venueId="row.item.venueId"></UploadVenuePhoto>
            </b-modal>
            <div>
              <b-row>
                <b-carousel
                  controls
                  indicators
                  background="#ababab"
                  img-width="1024"
                  img-height="480"
                  style="text-shadow: 1px 1px 2px #333;">
                  <div class="carousel-item" v-for="(photo,idx) in row.item.photos" :class="{ active: idx==0 }">
                    <img :src="baseUrl + 'venues/' + row.item.venueId + '/photos/' + photo.photoFilename" class="img-fluid" alt="venue photo">
                  </div>
                </b-carousel>
              </b-row>
            </div>
          </b-tab>
          <b-tab title="Reviews">
            <Reviews :venueId="row.item.venueId"></Reviews>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
  </b-table>
  </div>
</template>

<script src="venueTable.js"></script>
