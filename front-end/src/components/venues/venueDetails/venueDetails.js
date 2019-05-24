import EditVenue from '../../editVenue/EditVenue.vue'
import FormatISODate from '../FormatISODate.vue'

export default {
  data() {
    return {
    }
  },
  methods: {
    userIsAdminOfVenue(adminId) {
      return parseInt(adminId) === parseInt($cookies.get("loggedInUserId"));
    },
  },
  props: ['venueDetails'],
  components: {
    EditVenue,
    FormatISODate
  }
}
