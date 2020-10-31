<template>
  <q-footer v-if="screen == 'xs'" class="footer-color">
    <div>
      <div class="absolute ss">
        <q-btn flat icon="my_location" class="absolute btn" dense>
          <span class="qr"></span>
        </q-btn>
      </div>
      <q-card flat class=" absolute-bottom footer-color">
        <q-card-section class="full-width full-height ">
          <div class="row justify-center justify-around items-center">
            <q-btn dense flat text-color="white" icon="home" to="/"></q-btn>
            <q-btn dense flat text-color="white" icon="settings"></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- <q-tabs
      no-caps
      active-color="teal"
      indicator-color="transparent"
      class="bg-grey-10 q-ma-sm"
      v-model="tab"
      dense
    >
      <q-tab name="home" icon="home" label="Home" />

      <q-tab name="locker" icon="dashboard" label="Locker" />
      <q-tab name="settings" icon="settings" label="Setting" />
    </q-tabs> -->
  </q-footer>
</template>

<script>
export default {
  data() {
    return {
      screen: "",
      tab: "home"
    };
  },
  mounted() {
    this.screen = this.$q.screen.name;
  }
};
</script>

<style lang="scss" scoped>
.second-card {
  background: linear-gradient(to right, purple, red);
}
.qr {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  filter: drop-shadow(0px 0px 3px #455484);
  background-color: white;
  z-index: -1;
}
.ss {
  position: fixed;

  color: #455484;
  left: calc(50vw - 8px);
  z-index: 1;
}
.btn {
  position: absolute;

  bottom: 5px;
}
.footer-color {
  background: #1f2865;
}
</style>
