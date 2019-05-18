<template>
  <b-card>
    <div v-if="this.userIsViewingOwnProfile" align="right">
      <b-button v-b-modal.modal-1>Edit</b-button>
    </div>
    <b-img style="width:150px" src="https://picsum.photos/1024/400/?image=41"></b-img>
    <h3>{{ publicUserInfo.givenName + " " + publicUserInfo.familyName }}</h3>
    <p>Username: {{ publicUserInfo.username }}</p>
    <b-modal id="modal-1" title="BootstrapVue">
      <EditProfile></EditProfile>
    </b-modal>
  </b-card>

</template>

<script src="./profile.js"></script>

<style>
  thumbnail {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
  }
</style>
