export default{
  name: 'SignUp',
  data() {
    return {
      errorMessages: '',
      givenName: "",
      familyName: "",
      password: "",
      currentPassword: "",
      profileFormHasErrors: "",
      passwordFormHasErrors: "",
      rules: {
        givenNameRules: [() => !!this.givenName || 'First name is required'],
        familyNameRules: [() => !!this.familyName || 'Last name is required'],
        passwordRules: [() => !!this.password || 'Password is required'],
        confirmPasswordRules: [() => !!this.confirmPassword || 'Confirmed password is required',
          (input) => input === this.password || 'Passwords do not match, try again'],
        currentPasswordRules: [() => !!this.currentPassword || 'Current password is required',
          () => this.currentPassword === localStorage.getItem("password") || 'Password does not match your current password']
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
      const userId = localStorage.getItem("loggedInUserId");
      const url = this.baseUrl + 'users/' + userId;
      const headers = {headers: {'X-Authorization': localStorage.getItem("auth")}};
      return this.$http.patch(url, JSON.stringify(form), headers)
        .then(function (response) {
          console.log(response);
          localStorage.setItem("password", this.password);
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
      this.passwordFormHasErrors = !this.validateForm(this.passwordForm);
      if (this.passwordFormHasErrors === false) {
        delete this.passwordForm.currentPassword;
        this.sendForm(this.passwordForm)
          .then((responseData) => {
          }, (responseData) => {
          });
      }
    }
  },
  props: ['previousFamilyName', 'previousGivenName']
}
