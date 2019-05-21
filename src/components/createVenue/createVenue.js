export default {
  data() {
    return {
      categories: [],
      venueName: "",
      categoryId: "",
      shortDescription: "",
      longDescription: "",
      city: "",
      address: "",
      latitude: "",
      longitude: "",
      errorMessages: "",
      rules: {
        venueNameRules: [(input) => !!input || 'Venue name is required'],
        categoryRules: [(input) => !!input || 'Category is required'],
        shortDescriptionRules: [(input) => !!input || 'Short description is required'],
        longDescriptionRules: [(input) => !!input || 'Long Description is required'],
        cityRules: [(input) => !!input || 'City is required'],
        addressRules: [(input) => !!input || 'Address is required'],
        latitudeRules: [(input) => !!input || 'Latitude is required',
          (input) => /^\d+$/.test(input) || 'Latitude must be a number'],
        longitudeRules: [(input) => !!input || 'Longitude is required',
          (input) => /^\d+$/.test(input) || 'Longitude must be a number']
      },
      alerts: {
        success: false,
        error: false
      },
      error: "",
      errorFlag: false,
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  created() {
    this.getCategories()
  },
  computed: {
    selectedCategoryId() {
      return this.category ? this.category['categoryId'] : null
    },
    form () {
      return {
        venueName: this.venueName,
        categoryId: this.categoryId,
        shortDescription: this.shortDescription,
        longDescription: this.longDescription,
        city: this.city,
        address: this.address,
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
      }
    }
  },
  methods: {
    getCategories() {
      this.$http.get(this.baseUrl + 'categories')
        .then(function (response) {
          this.categories = response.body;
        }, function (error) {
          this.error = error;
          this.errorFlag = true;
        });
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
      const url = this.baseUrl + 'venues';
      const headers = {headers: {'X-Authorization': localStorage.getItem("auth")}};
      return this.$http.post(url, JSON.stringify(this.form), headers)
    },
    submit() {
      this.errorMessages = '';
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        this.sendForm(this.form)
          .then(function (response) {
            this.alerts.success = true;
          }, function (error) {
            this.alerts.error = true;
          });
      }
    }
  }
}
