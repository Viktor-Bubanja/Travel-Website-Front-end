<template>
  <v-toolbar app color="brown darken-4" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Review Website</v-toolbar-title>
    <v-btn flat>Venues</v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="!userIsLoggedIn" flat v-on:click="navigateLoginPage()">LOG IN</v-btn>
    <v-btn v-if="userIsLoggedIn" flat v-on:click="logoutUser()">LOG OUT</v-btn>
    <v-btn color="brown lighten-3">SIGN UP</v-btn>
  </v-toolbar>
</template>

<script src="./navigationBar.js"></script>

<style scoped>
</style>
