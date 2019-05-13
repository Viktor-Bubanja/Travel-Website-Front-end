<template>
  <div>
    <div>
      <v-app>
        <v-container>
          <v-flex>
            <v-card>
              <v-card-title class="headline font-weight-regular blue-grey white--text">Sign up</v-card-title>
              <div align="center">
                <v-form ref="form" lazy-validation>
                  <v-flex xs12 sm6 md3>
                    <v-text-field
                      v-model="form.firstName"
                      label="First name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md3>
                    <v-text-field
                      v-model="form.lastName"
                      label="Last name"
                      required
                      :error-messages="errorMessage('Last name')"
                      @blur="validate(form.lastName)"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md3>
                    <v-text-field
                      v-model="form.userName"
                      label="Username"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md3>
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md3>
                    <v-text-field type="password"
                      v-model="form.password"
                      label="Password"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md3>
                    <v-text-field type="password"
                      v-model="form.confirmPassword"
                      label="Confirm password"
                      required
                    ></v-text-field>
                  </v-flex>

                <v-btn flat
                  @click="submit"
                  :disabled="!valid"
                >SIGN UP</v-btn>
                </v-form>

                <form method="post" action="this.baseUrl + users/" id="signUpForm"></form>
            </div>

            </v-card>
          </v-flex>
        </v-container>
      </v-app>

    </div>
  </div>
</template>

<script src="./SignUpForm.js"></script>
