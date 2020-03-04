<template>
  <v-app>
    <VenueForm @form-submitted="sendForm"></VenueForm>
    <v-alert
      :value="alerts.success"
      type="success"
      dismissible
    >Venue created successfully
    </v-alert>
    <v-alert
      :value="alerts.error"
      type="error"
      dismissible
    >Error happened, please try again
    </v-alert>
  </v-app>
</template>

<script src="createVenue.js"></script>
