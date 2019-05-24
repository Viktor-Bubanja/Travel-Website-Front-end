export default {
  data(){
    return {
      photo: "",
      description: "",
      isPrimary: false,
      descriptionRule: [(input) => !!input || "Description can't be empty"],
      errorMessages: "",
      formHasErrors: "",
      alerts: {
        success: false,
        error: false
      },
      baseUrl: "http://localhost:4941/api/v1/",
    }
  },
  computed: {
    form() {
      return {
        photo: this.photo,
        description: this.description,
        isPrimary: this.isPrimary
      }
    }
  },
  methods: {
    handleFileUpload() {
      this.form.photo = this.$refs.photo.files[0];
    },
    sendForm() {
      let formData = new FormData();
      formData.append('photo', this.form.photo);
      formData.append('makePrimary', this.form.isPrimary);
      formData.append('description', this.form.description);
      const headers = {headers: {
          'Content-Type': 'multipart/form-data',
          'X-Authorization': $cookies.get("auth")}};
      const url = this.baseUrl + 'venues/' + this.venueId + '/photos';
      return this.$http.post(url, formData, headers);
    },
    fieldIsEmpty(field) {
      return field === null || field === "";
    },
    validateForm() {
      let formIsValid = true;
      Object.keys(this.form).forEach(f => {
        console.log(this.form.photo);
        if (f === "photo") {
          if (this.form.photo === "") {
            formIsValid = false;
          }
        } else {
          if (this.$refs[f].validate(true) === false) {
            formIsValid = false;
          }
        }
      });
      return formIsValid;
    },
    checkPhotoTooLarge(photo) {
      const fileSizeLimit = 20000000;
      return photo.size > fileSizeLimit;
    },
    submit() {
      this.formHasErrors = !this.validateForm();
      const photoTooLarge = this.checkPhotoTooLarge(this.form.photo);
      if (photoTooLarge === true) {
        this.alerts.error = true;
      } else if (this.formHasErrors === false) {
        this.sendForm()
          .then(() => {
            console.log("success");
            this.alerts.success = true;
          }, () => {
            console.log("error");
            this.alerts.error = true;
          });
      }
    }
  },
  props: ['venueId']
}
