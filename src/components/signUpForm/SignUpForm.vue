<template>
<div id="app">
  <v-app>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              ref="givenName"
              v-model="givenName"
              :rules="rules.givenNameRules"
              label="First Name"
              required
            ></v-text-field>
            <v-text-field
              ref="familyName"
              v-model="familyName"
              :rules="rules.familyNameRules"
              label="Last Name"
              required
            ></v-text-field>
            <v-text-field
              ref="username"
              v-model="username"
              :rules="rules.usernameRules"
              :error-messages="errorMessages"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              ref="email"
              v-model="email"
              :rules="rules.emailRules"
              :error-messages="errorMessages"
              label="Email"
              required
              validate-on-blur
            ></v-text-field>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</div>

</template>

<script src="signUpForm.js"></script>
