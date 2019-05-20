import {AsyncComponentPromise as reject} from "vue";

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
      usernameEmailUnique: true,
      rules: {
        emailRules: [
        (input) => !!input || 'Email is required',
        (input) => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(input)
          || 'E-mail must be valid'
      ],
        givenNameRules: [(input) => !!input || 'First name is required'],
        familyNameRules: [(input) => !!input || 'Last name is required'],
        usernameRules: [(input) => !!input || 'Username is required',
          (input) => input.length <= 64 || 'Username cannot be more than 64 characters long',
          (input) => /^[a-z0-9]+$/i.test(input) || 'Username can consist of only letters and numbers'],
        passwordRules: [(input) => !!input || 'Password is required'],
        confirmPasswordRules: [(input) => !!input || 'Confirmed password is required',
          (input) => input === this.password || 'Passwords do not match, try again'],
        error: "",
        errorFlag: false,
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
      console.log("HERE");
      let formIsValid = true;
      Object.keys(this.form).forEach(f => {
        console.log(f);
        console.log(this.$refs[f].validate(true));
        if (this.$refs[f].validate(true) === false) {
          formIsValid = false;
        }
      });
      return formIsValid;
    },
    sendForm(form) {
      const url = this.baseUrl + 'users';
      return this.$http.post(url, JSON.stringify(this.form))
    },
    submit () {
      this.errorMessages = '';
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        delete this.form.confirmPassword;
        this.sendForm(this.form)
          .then(function (response) {
            console.log(response);
            console.log("here");
            localStorage.setItem("auth", response.body.token);
            localStorage.setItem("loggedInUserId", response.body.userId);
            localStorage.setItem("password", this.password);
            this.$router.push("/venues")
          }, function (error) {
            console.log("here2");
            console.log("error");
            this.errorMessages = "Email or username already in use";
            this.usernameEmailUnique = false;
          });
      }
    }
  }
}
