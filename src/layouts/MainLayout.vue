<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      tab: "home",
      screen: "",
    };
  },
  mounted() {
    this.screen = this.$q.screen.name;
  },
};
</script>
<style lang="stylus" scoped>
.toolbar_logo {
  height: 30px;
  padding-top: 5px;
}
</style>