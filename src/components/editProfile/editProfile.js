export default{
  name: 'SignUp',
  data() {
    return {
      errorMessages: '',
      givenName: "",
      familyName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      formHasErrors: "",
      rules: {
        givenNameRules: [() => !!this.givenName || 'First name is required'],
        familyNameRules: [() => !!this.familyName || 'Last name is required'],
        passwordRules: [() => !!this.password || 'Password is required'],
        confirmPasswordRules: [() => !!this.confirmPassword || 'Confirmed password is required',
          (input) => input === this.password || 'Passwords do not match, try again']
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
    form () {
      return {
        givenName: this.givenName,
        familyName: this.familyName,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
    }
  },
  methods: {
    onUpdateUsername(username) {
      this.username = username;
    },
    validateForm() {
      let formIsValid = true;
      Object.keys(this.form).forEach(f => {
        if (this.$refs[f].validate(true) === false) {
          formIsValid = false;
        }
      });
      return formIsValid;
    },
    sendForm(form) {
      let userId = 1;
      const url = this.baseUrl + '/users/' + userId;
      return this.$http.patch(url, JSON.stringify(this.form))
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    submit () {
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        delete this.form.confirmPassword;
        console.log(this.sendForm(this.form));
        this.sendForm(this.form)
          .then((responseData) => {
            console.log(responseData);
          });

      }
    }
  }
}
