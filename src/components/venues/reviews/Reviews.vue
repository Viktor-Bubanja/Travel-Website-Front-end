<template>
  <v-card>
    <v-flex xs12 offset-xs10>
      <v-btn :disabled="!($cookies.get('auth'))" v-b-modal.add-review-modal>Add review</v-btn>
    </v-flex>
    <b-modal id="add-review-modal" title="Add review" hide-footer>
      <p>sfdgsdfg</p>
      <AddReview @review-submitted="reviewSubmittedHandler" :venueId="venueId"></AddReview>
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

<script src="reviews.js"></script>
