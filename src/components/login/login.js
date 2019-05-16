
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
