<template>
  <v-text-field
    ref="username"
    v-model="username"
    :rules="usernameRules"
    label="Username"
    required
    v-on:keyup="emitInputToParent"
  ></v-text-field>
</template>

<script>
  export default {
    data () {
        return {
          username: "",
          usernameRules: [() => !!this.username || 'Username is required']
        }
    },
    methods: {
      emitInputToParent(event) {
        this.$emit('childToParent', this.username);
      }
    }
  }
</script>
