<template>
  <q-footer v-if="screen == 'xs'" class="footer">
    <div>
      <div flat class="absolute-bottom scan-btn">
        <div class="absolute ss">
          <q-btn
            flat
            icon="fas fa-qrcode"
            class="absolute btn"
            size="1.5rem"
            dense
            to="/scanner?mode=RENTAL"
          >
            <span class="qr"></span>
          </q-btn>
        </div>
        <div class="row justify-between q-mb-lg q-mx-xl">
          <q-btn dense flat text-color="white" icon="fas fa-home" to="/"
            ><span class="absolute q-mt-xl">home</span></q-btn
          >
          <q-btn
            dense
            flat
            text-color="white"
            icon="fas fa-user-alt"
            to="/account"
          >
            <span class="absolute q-mt-xl">account</span>
          </q-btn>
        </div>
      </div>
    </div>
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

  color: #B52324;
  top: 96%;
  left: calc(50vw - 23px);

  z-index: 1;
}
.btn {
  position: absolute;

  bottom: 0px;
}
.scan-btn {
  background: #167A82;
}

.footer {
  min-height: 65px;
  max-height: 65px;
  background: #167A82;
}
</style>
