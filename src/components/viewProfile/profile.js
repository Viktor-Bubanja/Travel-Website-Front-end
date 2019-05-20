import EditProfile from '../editProfile/EditProfile.vue'
export default {
  data() {
    return {
      userInfo: {
        givenName: "",
        familyName: "",
        username: "",
        email: ""
      },
      password: localStorage.getItem("password"),
      showModal: false,
      baseUrl: "http://localhost:4941/api/v1/"
    }
  },
  computed: {
    userIsAuthenticated() {
      return localStorage.getItem("auth") !== null;
    },
    userIsViewingOwnProfile() {
      return this.$route.params.userId === localStorage.getItem("loggedInUserId");
    }
  },
  methods: {
    getUser() {
      console.log("get user called");
      const headers = {headers: {'X-Authorization': localStorage.getItem("auth")}};
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
