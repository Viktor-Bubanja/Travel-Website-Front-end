
<template>
  <b-card>
    <b-tabs card>
      <b-tab title="Tab 1" active>
        <slot v-bind:venue="venue">{{ row.item.category }}</slot>
      </b-tab>
      <b-tab title="Tab 2">
        <b-col>{{ row.item.name }}</b-col>
      </b-tab>
    </b-tabs>
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
