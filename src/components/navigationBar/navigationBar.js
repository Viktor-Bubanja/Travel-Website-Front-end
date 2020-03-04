export default {
  data() {
    return {
      userIsLoggedIn: false
    }
  },
  mounted() {
    this.checkUserLoggedIn();
  },
  watch: {
    $route(to, from) {
      this.checkUserLoggedIn();
    }
  },
  methods: {
    checkUserLoggedIn() {
      this.userIsLoggedIn = $cookies.get("auth") !== null;
    },
    logoutUser() {
      $cookies.remove("auth");
      $cookies.remove("loggedInUserId");
      this.navigateVenuePage();
      document.location.reload();
      this.checkUserLoggedIn();
    },
    navigateProfilePage() {
      this.$router.push("profile/" + $cookies.get("loggedInUserId"));
    },
    navigateVenuesPage() {
      this.$router.push("venues");
    },
    navigateCreateVenuePage() {
      this.$router.push("/createVenue");
    },
    navigateMyVenuesPage() {
      this.$router.push("/myVenues");
    },
    navigateLoginPage() {
      this.$router.push("/login");
      this.checkUserLoggedIn();
    },
    navigateVenuePage() {
      this.$router.push("/venues");
      this.checkUserLoggedIn();
    },
    navigateSignUpPage() {
      this.$router.push("/signUp");
    }
  }
}
