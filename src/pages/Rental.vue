<template>
  <div>
    <component
      :is="step"
      :box="box"
      @decode="onDecoded"
      @back="onBack"
      @confirm="onConfirm"
      @rent="onRent"
    ></component>
    <div
      v-if="step !== 'QrcodeStream'"
      class="text-center q-mt-md text-h5"
      style="text-decoration: underline; color: blue"
    >
      <div
        v-if="step === 'Box' || step === 'PasswordForm'"
        @click="toPreviousPage"
      >
        < Back to previous page
      </div>
      <div v-if="step === 'RentalResult'" @click="toMyLocker">
        View my locker
      </div>
    </div>
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

<style></style>
