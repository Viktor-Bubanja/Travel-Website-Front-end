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
        emailRules: [
          (v) => !!v || 'Name is required',
          (v) => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v)
            || 'E-mail must be valid'
        ],
        givenNameRules: [() => !!this.givenName || 'First name is required'],
        familyNameRules: [() => !!this.familyName || 'Last name is required'],
        usernameRules: [() => !!this.username || 'Username is required'],
        passwordRules: [() => !!this.password || 'Password is required'],
        confirmPasswordRules: [() => !!this.confirmPassword || 'Confirmed password is required',
          (input) => input === password || 'Passwords do not match, try again']
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
      const url = this.baseUrl + 'users';
      return this.$http.post(url, JSON.stringify(this.form))
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
            this.$router.push("/venues")
          });

      }
    }
  }
}
