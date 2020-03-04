import VenueForm from '../venueForm/VenueForm.vue'

export default {
  data() {
    return {
      alerts: {
        success: false
      },
      error: "",
      errorFlag: false,
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  methods: {
    sendForm(form) {
      const url = this.baseUrl + 'venues/' + this.venueDetails.venueId;
      const headers = {headers: {'X-Authorization': $cookies.get("auth")}};
      this.$http.patch(url, JSON.stringify(form), headers)
        .then(() => {
          this.alerts.success = true;
          document.location.reload();
        }, () => {
          this.alerts.success = false;
        })
    }
  },
  props: ['venueDetails'],
  components: {
    VenueForm
  }
}
