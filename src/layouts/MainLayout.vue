<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
            <img class="toolbar_logo" src="../assets/icon2.png" />
        </q-toolbar-title>

        <q-btn dense flat round icon="face" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" overlay behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="bg-blue-grey-2 text-black">
      <router-view />
    </q-page-container>
    <q-footer v-if="screen == 'xs'" class="bg-white">
      <q-tabs
        no-caps
        active-color="teal"
        indicator-color="transparent"
        class="text-grey-10"
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
      right: false,
      tab: "home",
      screen: ""
    };
  },  
  mounted() {
    this.screen = this.$q.screen.name;
    console.log("screen", this.screen);
  }
};
</script>
<style lang="stylus" scoped>
.toolbar_logo {
  height : 30px;
  padding-top : 5px;
}
</style>