import EditProfile from '../editProfile/EditProfile.vue'

export default {
  data() {
    return {
      userInfo: {
        givenName: "",
        familyName: "",
        username: "",
        email: "",
        profilePhoto: null
      },
      showModal: false,
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  computed: {
    userIsAuthenticated() {
      return $cookies.get("auth") !== null;
    },
    userIsViewingOwnProfile() {
      return this.$route.params.userId === $cookies.get("loggedInUserId");
    }
  },
  methods: {
    getUser() {
      const headers = {headers: {'X-Authorization': $cookies.get("auth")}};
      this.$http.get(this.baseUrl + 'users/' + this.$route.params.userId, headers)
        .then(function(response) {
          this.userInfo = response.body;
        }, function(error) {
          console.log(error);
        })
    }
  },

  created() {
    this.getUser()
  },
  components: {
    EditProfile
  }
}
