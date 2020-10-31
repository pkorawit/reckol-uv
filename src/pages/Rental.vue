<template>
  <div class="column justify-between rental">
    <div class="about-section ">
      <p class="text-h6">About</p>
      <p class="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        velit? Doloribus numquam quia debitis ut tempora est accusantium
        inventore quod. Officiis quibusdam animi aliquam, quod nam totam beatae
        assumenda ex!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, quos
        culpa! Facere voluptate repellendus error quibusdam omnis quis nulla
        nostrum necessitatibus ad ipsum eos quia rerum aliquid, reprehenderit
        sed amet.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
        voluptatibus et soluta velit amet voluptatem reprehenderit quae a, ipsa
        ad autem reiciendis ratione ea suscipit! Voluptas fugit alias quae
        adipisci?
      </p>
    </div>

    <q-card class="box">
      <q-card-section>
        <p class="text-h6">Your Locker</p>
        <div v-for="index in 2" :key="index">
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
.rental {
  background: #1f2865;
  color: white;
}
.box {
  position: absolute;
  padding: 0;
  background: #eeecec;
  color: black;
  // margin: 0;
  top: 100%;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin-top: 10%;
  overflow-y: hidden;
  border-radius: 50px 50px 0px 0px;
  /* This timing applies on the way OUT */
  transition-timing-function: ease-in-out;

  component,
  &:nth-child(1) {
    top: 40%;
  }

  /* Quick on the way out */
  transition: 0.2s;

  &:hover {
    margin: 0;
    top: 10%;
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

@mixin test($child) {
  @if ($child == 0) {
    @keyframes Span {
      from {
        margin-top: 10%;
        top: 100%;
        height: 100%;
      }
      to {
        margin-top: 0;
        top: 10%;
        height: 80vh;
      }
    }
  } @else if($child ==1) {
    @keyframes Span {
      from {
        margin-top: 10%;
        top: 100%;
        height: 100%;
      }
      to {
        margin-top: 0;
        top: 10%;
        height: 80vh;
      }
    }
  } @else if($child >=2) {
    @keyframes Span {
      from {
        margin-top: 10%;
        top: 100%;
        height: 100%;
      }
      to {
        margin-top: 0;
        top: 10%;
        height: 80vh;
      }
    }
  }
}
</style>
