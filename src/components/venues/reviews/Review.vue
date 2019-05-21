<template>
  <v-card>
    <p>{{ review.reviewBody }}</p>
    <p>Star rating: {{ review.starRating }}</p>
    <p>Cost rating: {{ review.costRating }}</p>
    <p>Author: {{ review.authorUsername }}</p>
    <p>{{ review.timePosted }}</p>
  </v-card>
</template>

<script src="./review.js"></script>
