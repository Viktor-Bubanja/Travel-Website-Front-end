<template>
<v-app>
  <v-layout justify-center>
    <b-card ref="form">
      <b-tabs  pills card vertical>
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
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn flat>Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip
                v-if="formHasErrors"
                left
              >
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn color="primary" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </b-tab>
        <b-tab  title="Password">
          <v-text-field
            type="password"
            ref="password"
            v-model="password"
            :rules="rules.passwordRules"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            ref="confirmPassword"
            v-model="confirmPassword"
            :rules="rules.confirmPasswordRules"
            label="Confirm password"
            required
            validate-on-blur
          ></v-text-field>
        </b-tab>
      </b-tabs>
    </b-card>
  </v-layout>
</v-app>
</template>

<script src="./editProfile.js"></script>
