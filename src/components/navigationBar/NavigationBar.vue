<template>
  <v-toolbar app color="brown darken-4" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ "Review Website" }}</v-toolbar-title>
    <v-btn flat>Venues</v-btn>
    <v-spacer></v-spacer>
    <v-btn flat>SIGN IN</v-btn>
    <v-btn color="brown lighten-3">JOIN</v-btn>
  </v-toolbar>

</template>

<script>
  export default {
    name: 'AppNavigation'
  };
</script>

<style scoped>
</style>
