<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <b-container>
          <b-row>
            <b-col>
              <b-img fluid-grow src="https://picsum.photos/1024/400/?image=41"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h3>{{ userInfo.givenName + " " + userInfo.familyName }}</h3>
              <p>Username: {{ userInfo.username }}</p>
              <div v-if="this.userIsViewingOwnProfile">
                <p>Email: {{ userInfo.email }}</p>
                <p>Password: {{ password }}</p>
              </div>

            </b-col>
            <b-col>3 of 3</b-col>
          </b-row>
        </b-container>
        <div v-if="this.userIsViewingOwnProfile" align="right">
          <b-button v-b-modal.modal-1>Edit</b-button>
        </div>
        <b-modal id="modal-1" @hide="getUser" title="Edit Profile">
          <EditProfile :givenName="userInfo.givenName" :familyName="userInfo.familyName"></EditProfile>
        </b-modal>

      </v-card>
    </v-flex>
  </v-layout>

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
