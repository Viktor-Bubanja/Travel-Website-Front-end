
<template>
  <b-card>
    <div v-if="userIsAdminOfVenue(row.item.admin.userId)" align="right">
      <b-button v-b-modal.edit-venue-modal>Edit</b-button>
    </div>
    <b-modal id="edit-venue-modal" title="Edit Venue">
      <EditVenue></EditVenue>
    </b-modal>
    <h4>About {{ row.item.venueName }}</h4>
    <div align="right">
      <p>Category: {{ row.item.category}}</p>
      <p>Admin: {{ row.item.admin}}</p>
    </div>
  </b-card>
</template>

<script>
  export default {
    data() {
      return {
        defaultSlotText: "I'll get rendered inside the default slot.",
      }
    }
  }
</script>
