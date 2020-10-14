<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-white text-black column flex-center q-pa-md"
      style="border-bottom: solid 3px"
    >
      <div class="text-h5">College of Computing</div>
      <div class="text-h6">Total 99 boxes</div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer v-if="screen == 'xs'" class="bg-white">
      <q-tabs
        no-caps
        active-color="teal"
        indicator-color="transparent"
        class="bg-grey-10"
        v-model="tab"
        dense
      >
        <q-tab name="home" icon="home" label="Home" />
        <q-tab name="locker" icon="dashboard" label="Locker" />
        <q-tab name="settings" icon="settings" label="Setting" />
      </q-tabs>
    </q-footer>
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