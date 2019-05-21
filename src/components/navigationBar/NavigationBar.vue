<template>
  <v-toolbar app color="blue darken-4" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Review Website</v-toolbar-title>
    <v-btn v-on:click="navigateVenuesPage()" flat>Venues</v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="userIsLoggedIn" flat v-on:click="navigateProfilePage()">PROFILE</v-btn>
    <v-btn v-if="userIsLoggedIn" flat v-on:click="navigateCreateVenuePage()">CREATE VENUE</v-btn>
    <v-btn v-if="userIsLoggedIn" flat v-on:click="navigateMyVenuesPage()">MY VENUES</v-btn>
    <v-btn v-if="!userIsLoggedIn" flat v-on:click="navigateLoginPage()">LOG IN</v-btn>
    <v-btn v-if="userIsLoggedIn" flat v-on:click="logoutUser()">LOG OUT</v-btn>
    <v-btn v-if="!userIsLoggedIn" color="brown lighten-3" v-on:click="navigateSignUpPage()">SIGN UP</v-btn>
  </v-toolbar>
</template>

<script src="./navigationBar.js"></script>

<style scoped>
</style>
