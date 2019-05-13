
export default {
  name: 'SignUp',
  data() {
    return {
      baseUrl: "http://localhost:4941/api/v1/",
      form: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      nameRules: [
        (v) => !!v || 'First name is required'
      ],
      emailRules: [
        (v) => !!v || 'Name is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    errorMessage: function(field) {
      return field + " is a required field"
    },
    submit() {
      signUpForm.submit()
    },
    validateField(field) {
      return field !== "";
    }
  }
};
