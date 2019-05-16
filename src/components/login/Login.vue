<template>
  <div id="app">
    <v-app>
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card ref="form">
            <v-card-text>
              <v-text-field
                ref="usernameOrEmail"
                v-model="usernameOrEmail"
                :rules="rules.usernameEmailRules"
                label="Username or Email"
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

<script src="./login.js">
</script>
