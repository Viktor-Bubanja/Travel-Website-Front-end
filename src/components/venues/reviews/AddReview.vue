<template>
  <v-app>
    <v-container fluid grid-list-md>
      <p style="color:red;">{{errorMessage}}</p>
        <v-textarea
          ref="reviewBody"
          v-model="reviewBody"
          box
          label="How was your experience..."
          auto-grow
          :rules="nonEmptyRule"
        ></v-textarea>
        <v-select
          ref="starRating"
          v-model="starRating"
          :items="starRatingValues"
          label="Star rating"
          :rules="nonEmptyRule"
        ></v-select>
        <v-select
          ref="costRating"
          v-model="costRating"
          item-text="costRatingLabel"
          item-value="costRatingValue"
          :items="costRatings"
          label="Cost rating"
          :rules="nonEmptyRule"
        ></v-select>

      <v-card-actions>
        <v-btn color="primary" flat @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-container>
  </v-app>
</template>

<script src="./addReview.js"></script>
