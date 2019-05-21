export default{
  name: 'SignUp',
  data() {
    return {
      errorMessages: '',
      givenName: this.previousGivenName,
      familyName: this.previousFamilyName,
      password: "",
      currentPassword: "",
      profileFormHasErrors: "",
      passwordFormHasErrors: "",
      alerts: {
        updateError: false,
        passwordError: false
      },
      rules: {
        givenNameRules: [() => !!this.givenName || 'First name is required'],
        familyNameRules: [() => !!this.familyName || 'Last name is required'],
        passwordRules: [() => !!this.password || 'Password is required'],
        confirmPasswordRules: [() => !!this.confirmPassword || 'Confirmed password is required',
          (input) => input === this.password || 'Passwords do not match, try again'],
        currentPasswordRules: [() => !!this.currentPassword || 'Current password is required']
      },
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  watch: {
    name () {
      this.errorMessages = ''
    }
  },
  computed: {
    profileForm() {
      return {
        givenName: this.givenName,
        familyName: this.familyName
      }
    },
    passwordForm() {
      return {
        password: this.password,
        currentPassword: this.currentPassword
      }
    }
  },
  methods: {
    onUpdateUsername(username) {
      this.username = username;
    },
    validateForm(form) {
      let formIsValid = true;
      Object.keys(form).forEach(f => {
        if (this.$refs[f].validate(true) === false) {
          formIsValid = false;
        }
      });
      return formIsValid;
    },
    sendForm(form) {
      const userId = $cookies.get("loggedInUserId");
      const url = this.baseUrl + 'users/' + userId;
      const headers = {headers: {'X-Authorization': $cookies.get("auth")}};
      return this.$http.patch(url, JSON.stringify(form), headers)
        .then(function (response) {
          this.password = "";
          this.currentPassword = "";
          return response.data;
        }, function (response) {
          console.log(response);
          return response.data;
        });
    },
    submitProfileForm() {
      this.profileFormHasErrors = !this.validateForm(this.profileForm);
      if (this.profileFormHasErrors === false) {
        this.sendForm(this.profileForm)
          .then((responseData) => {
          }, (responseData) => {
        });
      }
    },


    submitPasswordForm() {
      const newPasswordForm = {
        "password": this.password
      };
      const loginData = {
        "username": this.username,
        "password": this.currentPassword};

      const headers = {headers: {'X-Authorization': $cookies.get("auth")}};
      this.$http.post("http://localhost:4941/api/v1/users/login", loginData, {
        headers: headers
      }).then(function(response) {
          localStorage.setItem("authToken", response.data.token);
          this.sendForm(newPasswordForm);
        }, function(error) {
          console.log(error);
        });
    }




      // this.passwordFormHasErrors = !this.validateForm(this.passwordForm);
      // if (this.passwordFormHasErrors === false) {
      //   const headers = {headers: {'X-Authorization': $cookies.get("auth")}};
      //   console.log(headers);
      //   this.$http.get(this.baseUrl + 'users/' + $cookies.get("loggedInUserId"), headers)
      //     .then((response) => {
      //       return response.body;
      //     }, (error) => {
      //       console.log("error on logging in: ");
      //       console.log(error);
      //     })
      //     .then((user) => {
      //       console.log("getting user credentials to log in");
      //       console.log("user:  ");
      //       console.log(user);
      //       const loginBody = JSON.stringify(
      //         {
      //           "username": user.username,
      //           "password": this.passwordForm.currentPassword});
      //       this.$http.post(this.baseUrl + 'users/login', loginBody)
      //         .then((response) => {
      //           console.log("passwords matched");
      //           delete this.passwordForm.currentPassword;
      //           this.sendForm(this.passwordForm)
      //             .then((responseData) => {
      //               console.log("password changed I think: response data: ");
      //               console.log(responseData);
      //             }, (error) => {
      //               console.log("");
      //               this.alerts.updateError = true;
      //               this.alerts.passwordError = false;
      //             });
      //         }, (error) => {
      //           console.log("heerree");
      //           this.alerts.updateError = false;
      //           this.alerts.passwordError = true;
      //         })
      //     }, (error) => {
      //       console.log(error);
      //       this.alerts.updateError = false;
      //     });
      // }
    // }
  },
  props: ['username', 'previousFamilyName', 'previousGivenName']
}
