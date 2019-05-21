<template>
  <v-app>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-text-field
          ref="venueName"
          v-model="venueName"
          :rules="rules.venueNameRules"
          label="Venue name"
          required
        ></v-text-field>
        <v-select
          ref="categoryId"
          v-model="categoryId"
          :rules="rules.categoryRules"
          label="Category"
          required
          item-text="categoryName"
          item-value="categoryId"
          :items="categories"
        ></v-select>
        <v-text-field
          ref="shortDescription"
          v-model="shortDescription"
          :rules="rules.shortDescriptionRules"
          label="Short description"
          required
        ></v-text-field>
        <v-text-field
          ref="longDescription"
          v-model="longDescription"
          :rules="rules.longDescriptionRules"
          label="Long description"
          required
        ></v-text-field>
        <v-text-field
          ref="city"
          v-model="city"
          :rules="rules.cityRules"
          label="City"
          required
        ></v-text-field>
        <v-text-field
          ref="address"
          v-model="address"
          :rules="rules.addressRules"
          label="Address"
          required
        ></v-text-field>
        <b-row>
          <b-col>
            <v-text-field
              ref="latitude"
              v-model="latitude"
              :rules="rules.latitudeRules"
              label="Latitude"
              required
            ></v-text-field>
          </b-col>
          <b-col>
            <v-text-field
              ref="longitude"
              v-model="longitude"
              :rules="rules.longitudeRules"
              label="Longitude"
              required
            ></v-text-field>
          </b-col>
        </b-row>
        <div align="center">
          <v-card-actions>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
        </div>
        <div>
        <v-alert
          :value="alerts.success"
          type="success"
          dismissible
        >Venue created successfully
        </v-alert>
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script src="./createVenue.js"></script>
