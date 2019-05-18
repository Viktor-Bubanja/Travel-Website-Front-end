import EditProfile from '../editProfile/EditProfile.vue'
export default {
  data() {
    return {
      publicUserInfo: {
        givenName: "",
        familyName: "",
        username: ""
      },
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
      this.$http.get(this.baseUrl + 'users/' + this.$route.params.userId)
        .then(function(response) {
          this.publicUserInfo = response.data;
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
