<template>
  <v-card>
    <p>{{ review.reviewBody }}</p>
    <p>Star rating: {{ review.starRating }}</p>
    <p>Cost rating: {{ review.costRating }}</p>
    <p>Author: {{ review.reviewAuthor.username }}</p>
    <FormatISODate :isoDate="review.timePosted"></FormatISODate>
  </v-card>
</template>

<script>
  import FormatISODate from "../FormatISODate";
  export default {
    props: ['review'],
    components: {FormatISODate}
  }
</script>
