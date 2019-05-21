import VenueForm from '../venueForm/VenueForm.vue'

export default {
  data() {
    return {
      alerts: {
        success: false,
        error: false
      },
      error: "",
      errorFlag: false,
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  methods: {
    sendForm(form) {
      const url = this.baseUrl + 'venues';
      const headers = {headers: {'X-Authorization': $cookies.get("auth")}};
      this.$http.post(url, JSON.stringify(form), headers)
        .then(() => {
          this.$router.push("/myVenues");
        }, () => {
          this.alerts.error = true;
          console.log("error")
        })
    }
  },
  components: {
    VenueForm
  }
}
