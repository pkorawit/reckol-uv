<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar> Smart UV Locker
        </q-toolbar-title>

        <q-btn dense flat round icon="face" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" overlay behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer v-if="screen == 'xs'" class="bg-primary">
      <q-tabs
        no-caps
        active-color="white"
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