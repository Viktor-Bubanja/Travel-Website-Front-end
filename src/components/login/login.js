
export default{
  name: 'SignUp',
  data() {
    return {
      errorMessages: '',
      usernameOrEmail: "",
      password: "",
      formHasErrors: "",
      rules: {
        usernameEmailRules: [
          (v) => !!v || 'Username or Email is required',
          (v) => (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v) || !v.includes('@'))
            || 'E-mail must be valid'
        ],
        passwordRules: [() => !!this.password || 'Password is required']
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
        usernameOrEmail: this.usernameOrEmail,
        password: this.password
      }
    }
  },
  methods: {
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
      const url = this.baseUrl + 'users/login';
      const loginData = {};
      if (this.form.usernameOrEmail.includes("@")) {
        loginData.email = this.form.usernameOrEmail;
      } else {
        loginData.username = this.form.usernameOrEmail;
      }
      loginData.password = this.form.password;
      return this.$http.post(url, JSON.stringify(loginData));
    },
    submit () {
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        console.log(this.sendForm(this.form));
        this.sendForm(this.form)
          .then(function (response) {
            console.log(response);
            console.log(localStorage);
            localStorage.setItem("auth", response.body.token);
            localStorage.setItem("loggedInUserId", response.body.userId);
            this.$router.push("/venues");
          }, function (response) {
            console.log("error");
            console.log(response);
          });
      }
    }
  }
}
