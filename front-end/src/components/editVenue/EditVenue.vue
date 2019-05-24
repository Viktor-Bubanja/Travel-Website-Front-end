<template>
  <v-app>
    <VenueForm :venueDetails="venueDetails" @form-submitted="sendForm"></VenueForm>
    <v-alert
      :value="alerts.success"
      type="success"
      dismissible
    >Venue updated successfully
    </v-alert>
  </v-app>
</template>

<script src="./editVenue.js"></script>
