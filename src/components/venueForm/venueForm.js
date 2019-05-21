export default {
  data() {
    return {
      categories: [],
      venueName: "",
      category: {},
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
  mounted() {
    if (this.venueDetails !== undefined && this.venueDetails !== null) {
      this.venueName =  this.venueDetails.venueName;
      this.getCategories()
        .then((categories) => {
          this.category = categories.filter(item => item.categoryName === this.venueDetails.category)[0];
        });
      this.shortDescription =  this.venueDetails.shortDescription;
      this.longDescription =  this.venueDetails.longDescription;
      this.city =  this.venueDetails.city;
      this.address =  this.venueDetails.address;
      this.latitude = this.venueDetails.latitude;
      this.longitude = this.venueDetails.longitude;
    }
  },
  computed: {
    selectedCategoryId() {
      console.log("category: ");
      console.log(this.category);
      return this.category ? this.category['categoryId'] : null
    },
    form () {
      console.log("category: ");
      console.log(this.category);
      return {
        venueName: this.venueName,
        categoryId: this.selectedCategoryId,
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
      return this.$http.get(this.baseUrl + 'categories')
        .then(function (response) {
          this.categories = response.body;
          return response.body;
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
    submit() {
      this.errorMessages = '';
      this.formHasErrors = !this.validateForm();
      if (this.formHasErrors === false) {
        console.log("THE FORM");
        console.log(this.form);
        this.$emit('form-submitted', this.form);
      }
    }
  },
  props: ['venueDetails']
}
