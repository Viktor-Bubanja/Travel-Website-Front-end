<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <b-card>
    <div v-if="userIsAdminOfVenue(venueDetails.admin.userId)" align="right">
      <b-button v-b-modal.edit-venue-modal>Edit</b-button>
    </div>
    <b-modal id="edit-venue-modal" title="Edit Venue" hide-footer>
      <EditVenue :venueDetails="venueDetails"></EditVenue>
    </b-modal>
    <h4>About {{ venueDetails.venueName }}</h4>
    <b-row>
    <b-col>
      <p>Category: {{ venueDetails.category }}</p>
      <p>City: {{ venueDetails.city }}</p>
      <p>Address: {{ venueDetails.address }}</p>
      <p>Star rating: {{ venueDetails.starRating }}</p>
      <p>Cost rating: {{ venueDetails.costRating }}</p>
      <p>Admin: {{ venueDetails.admin.username}}</p>
      <p>Date posted: <FormatISODate :isoDate="venueDetails.dateAdded"></FormatISODate></p>
    </b-col>
    <b-col>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Description: {{venueDetails.shortDescription}}</div>
          </template>
          <v-card>
            <v-card-text>{{venueDetails.longDescription}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </b-col>
    </b-row>
  </b-card>
</template>

<script src="./venueDetails.js"></script>
