export default {
  data(){
    return {
      form: {
        photo: "",
        description: "",
        isPrimary: ""
      },
      nonEmptyRule: [(input) => !!input || "Field can't be empty"],
      errorMessages: "",
      formHasErrors: "",
      baseUrl: "http://localhost:4941/api/v1/",
    }
  },
  methods: {
    handleFileUpload() {
      this.form.photo = this.$refs.photo.files[0];
    },
    sendForm() {
      let formData = new FormData();
      formData.append('photo', this.photo);
      formData.append('makePrimary', "true");
      formData.append('description', "testing");
      const headers = {headers: {
          'Content-Type': 'multipart/form-data',
          'X-Authorization': localStorage.getItem("auth")}};
      const venueId = 25;//todo change
      const url = this.baseUrl + 'venues/' + venueId + '/photos';
      this.$http.post(url, formData, headers)
        .then(function (response) {
          console.log(response);
        }, function (error) {
          console.log(error);
        });
    },
    validateForm() {
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
    submit() {
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        this.sendForm();
      }
    }
  }
}
