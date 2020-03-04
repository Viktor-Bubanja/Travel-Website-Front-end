<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input ref="photo" type="file" id="file" v-on:change="handleFileUpload()"/>
      </label>
      <v-textarea
        ref=description
        :rules="descriptionRule"
        label="Photo description"
        v-model="form.description"
        required
      ></v-textarea>
      <div text-align="center">
      <v-switch
        ref="isPrimary"
        v-model="form.isPrimary"
        label="Primary photo"
      ></v-switch>
        <v-btn v-on:click="submit()">Submit</v-btn>
      <v-alert
        :value="alerts.success"
        type="success"
        dismissible
      >Photo successfully uploaded
      </v-alert>
        <v-alert
          :value="alerts.error"
          type="error"
          dismissible
        >Photo is too large (can't exceed 20MB)
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script src="./uploadVenuePhoto.js"></script>
