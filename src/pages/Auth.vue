<template>
  <div class="row items-center">
    <component
      :is="step"
      @decoded="onDecoded"
      @back="onBack"
      @confirm="onConfirm"
      :box="box"
    ></component>
  </div>
</template>

<script>
import Box from "../components/Box.vue";
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "RentalPage",
  components: {
    QrcodeStream,
    Box,
  },
  computed: {
    step: {
      get() {
        return this.$store.state.rental.step;
      },
      set(val) {
        this.$store.commit("setRentalStep", val);
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
      this.$store.dispatch("getBox", boxId);
    },
    onBack() {
      this.step = "QrcodeStream";
      this.$store.commit("clearRentalBox");
    },
    onConfirm() {
      this.$store.commit("setRentalPassword", val);
      this.step = "RentalResult";
      this.$store.dispatch("rentBox");
    },
  },
};
</script>

<style>
</style>