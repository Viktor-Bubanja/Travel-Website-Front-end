<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input ref="photo" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <v-textarea ref=description :rules="nonEmptyRule" label="Photo description" v-model="form.description"></v-textarea>
      <div text-align="center">
      <v-switch
        ref="isPrimary"
        v-model="form.isPrimary"
        label="Primary photo"
      ></v-switch>
        <v-btn v-on:click="submit()">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script src="./uploadVenuePhoto.js"></script>
