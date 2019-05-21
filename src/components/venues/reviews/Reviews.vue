<template>
  <v-card>
    <v-flex xs12 offset-xs10>
      <v-btn v-b-modal.review-modal>Add review</v-btn>
    </v-flex>
    <b-modal id="review-modal" title="Add review" hide-footer>
      <AddReview :venueId="venueId"></AddReview>
    </b-modal>
    <ul>
      <li v-for="review in reviews">
        <Review
          :review="review"
        ></Review>
      </li>
    </ul>
  </v-card>
</template>

<script src="./reviews.js"></script>
