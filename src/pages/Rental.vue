<template>
  <div class="body">
    <div class="card"></div>
  </div>
</template>

<script>
import Box from "../components/Box.vue";
import { QrcodeStream } from "vue-qrcode-reader";
import PasswordForm from "../components/PasswordForm.vue";
import { Notify } from "quasar";

export default {
  name: "RentalPage",
  components: {
    QrcodeStream,
    Box,
    PasswordForm,
  },
  computed: {
    step: {
      get() {
        return this.$store.state.rental.step;
      },
      set(val) {
        this.$store.commit("rental/setRentalStep", val);
      },
    },
    box: {
      get() {
        return this.$store.state.rental.selectedBox;
      },
    },
    rentalResult: {
      get() {
        return this.$store.state.rental.result;
      },
    },
  },
  methods: {
    onDecoded(boxId) {
      this.step = "Box";
      Notify.create(boxId);
      this.$store.dispatch("rental/getBox", boxId);
    },
    onBack() {
      this.step = "QrcodeStream";
      this.$store.commit("clearRentalBox");
    },
    onRent() {
      this.step = "PasswordForm";
    },
    onConfirm() {
      this.$store.commit("setRentalPassword", val);
      this.step = "RentalResult";
      this.$store.dispatch("rentBox");
    },
    toPreviousPage() {
      if (this.step == "QrcodeStream") {
      }
      if (this.step == "Box") {
        this.step = "QrcodeStream";
      }
      if (this.step == "PasswordForm") {
        this.step = "Box";
      }
      if (this.step == "RentalResult") {
        this.step = "RentalResult";
      }
    },
    toMyLocker() {
      this.$router.push("/my-locker");
    },
  },
  mounted() {
    this.$store.dispatch("rental/getBox", "");
  },
};
</script>

<style lang="scss">
.body {
  margin: 0px 0px 0px 0px;
  padding: 5px;
  height: 100vh;
  width: 100vw;
}

.card {
  border: 0px solid black;
  height: 20%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 50px 50px 0 0;
  background: linear-gradient(
    rgba(115, 150, 255, 0.452),
    rgba(230, 185, 255, 0.479)
  );
  transition: ease-in-out 0.2s;

  &:hover {
    height: 80%;
    transform: scaleX(1.5);
    background: linear-gradient(rgb(115, 150, 255), rgb(230, 185, 255));
  }
}
</style>
