<template>
  <div>
  <v-app>
    <v-container>
      <v-flex>
        <v-card  id="myVenues">
          <v-card-title class="headline font-weight-regular blue-grey white--text">My venues</v-card-title>
          <VenueTable :tableData="venues"></VenueTable>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
  </div>
</template>

<script src="myVenues.js"></script>

<style lang="css" scoped>
  #myVenues {
    align-self: center;
    padding: 20px;
    background: snow;
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

