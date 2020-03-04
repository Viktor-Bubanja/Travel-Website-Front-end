<template>
<v-app>
  <v-layout justify-center>
    <b-card>
      <b-tabs pills card vertical>
        <b-tab title="Profile" active>
          <v-card-text>
            <v-text-field
              ref="givenName"
              v-model="givenName"
              :rules="rules.givenNameRules"
              :error-messages="errorMessages"
              label="First Name"
              required
            ></v-text-field>
            <v-text-field
              ref="familyName"
              v-model="familyName"
              :rules="rules.familyNameRules"
              :error-messages="errorMessages"
              label="Last Name"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="submitProfileForm">Submit</v-btn>
          </v-card-actions>
        </b-tab>
        <b-tab title="Password">
          <v-card-text>
            <v-text-field
              ref="currentPassword"
              type="password"
              v-model="currentPassword"
              :rules="rules.currentPasswordRules"
              label="Current Password"
              required
              validate-on-blur
            ></v-text-field>
            <v-text-field
              ref="password"
              type="password"
              v-model="password"
              :rules="rules.passwordRules"
              label="New Password"
              validate-on-blur
              required
            ></v-text-field>
            <v-card-actions>
              <v-btn color="primary" flat @click="submitPasswordForm">Submit</v-btn>
            </v-card-actions>
            <v-alert
              :value="alerts.passwordError"
              type="error"
              dismissible
            >Current password is incorrect, please try again
            </v-alert>
              <v-alert
                :value="alerts.updateError"
                type="error"
                dismissible
              >Update failed, please try again
            </v-alert>
          </v-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </v-layout>
</v-app>
</template>

<script src="editProfile.js"></script>
