<template>
  <div class="column justify-between">
    <div class="about-section ">
      <p>lorem</p>
      <p class="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        velit? Doloribus numquam quia debitis ut tempora est accusantium
        inventore quod. Officiis quibusdam animi aliquam, quod nam totam beatae
        assumenda ex!
      </p>
    </div>

    <q-card class="box">
      <q-card-section>
        <div v-for="index in 10" :key="index">
          <component
            :is="step"
            :box="box"
            @decode="onDecoded"
            @back="onBack"
            @confirm="onConfirm"
            @rent="onRent"
            class="element"
          ></component>
        </div>
      </q-card-section>
    </q-card>

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
    PasswordForm
  },
  computed: {
    step: {
      get() {
        return this.$store.state.rental.step;
      },
      set(val) {
        this.$store.commit("rental/setRentalStep", val);
      }
    },
    box: {
      get() {
        return this.$store.state.rental.selectedBox;
      }
    },
    rentalResult: {
      get() {
        return this.$store.state.rental.result;
      }
    }
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
    }
  },
  mounted() {
    this.$store.dispatch("rental/getBox", "");
  }
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  padding: 0;

  // margin: 0;
  top: 100%;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin-top: 60%;
  overflow-y: hidden;
  border-radius: 50px 50px 0px 0px;
  /* This timing applies on the way OUT */
  transition-timing-function: ease-in-out;

  /* Quick on the way out */
  transition: 0.2s;

  &:hover {
    margin: 0;
    top: 20%;
    height: 80vh;
    overflow-y: scroll;
    animation: Span 0.5s;
  }
}
.element {
  margin: 20px;
}
.about-section {
}

@keyframes Span {
  from {
    margin-top: 60%;
    top: 100%;
    height: 100%;
  }
  to {
    margin-top: 0;
    top: 20%;
    height: 80vh;
  }
}
</style>
