<template></template>

<script>
export default {
  props: {
    btnLabel: {
      type: String,
      default: "Confirm",
    },
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.password);
    },
  },
};
</script>

<style>
</style>