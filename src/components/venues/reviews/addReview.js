export default {
  data() {
    return {
      errorMessage: "",
      reviewBody: "",
      starRating: 0,
      costRating: 0,
      starRatingValues: ["1", "2", "3", "4", "5"],
      costRatings: [
        {
          costRatingValue: "0",
          costRatingLabel: "Free"},
        {
          costRatingValue: "1",
          costRatingLabel: "$"},
        {
          costRatingValue: "2",
          costRatingLabel: "$$"},
        {
          costRatingValue: "3",
          costRatingLabel: "$$$"},
        {
          costRatingValue: "4",
          costRatingLabel: "$$$$"},
        ],
      nonEmptyRule: [(input) => !!input || 'Field cannot be empty'],
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  computed: {
    form () {
      return {
        reviewBody: this.reviewBody,
        starRating: parseInt(this.starRating),
        costRating: parseInt(this.costRating)
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
      const url = this.baseUrl + 'venues/' + this.venueId + '/reviews';
      const headers = {headers: {'X-Authorization': localStorage.getItem("auth")}};
      return this.$http.post(url, JSON.stringify(this.form), headers);
    },
    submit() {
      this.errorMessages = '';
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        delete this.form.confirmPassword;
        this.sendForm(this.form)
          .then(function (response) {
            console.log(response);
          }, function (error) {
            console.log(error);
            if (error.statusText.includes("cannot post more than one review for the same venue")) {
              this.errorMessage = "Sorry, you can't post more than one review for the same venue";
            } else if (error.statusText.includes("cannot post a review on your own venue")) {
              this.errorMessage = "Sorry, you can't post a review of your own venue";
            }
          })
      }
    }
  },
  props: ['venueId']
}
