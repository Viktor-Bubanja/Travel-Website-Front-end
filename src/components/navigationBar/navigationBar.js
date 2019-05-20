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
      this.userIsLoggedIn = localStorage.getItem("auth") !== null;
      console.log(this.userIsLoggedIn);
    },
    logoutUser() {
      localStorage.removeItem("auth");
      localStorage.removeItem("loggedInUserId");
      this.navigateVenuePage();
      this.checkUserLoggedIn();
    },
    navigateLoginPage() {
      this.$router.push("/login");
      this.checkUserLoggedIn();
    },
    navigateVenuePage() {
      this.$router.push("/venues");
      this.checkUserLoggedIn();
    }
  }
}
