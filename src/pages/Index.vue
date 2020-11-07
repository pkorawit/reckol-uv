<template>
  <div class="column">
    <div class="about">
      <div>
        <p class="text-h6">About</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          velit? Doloribus numquam quia debitis ut tempora est accusantium
          inventore quod. Officiis quibusdam animi aliquam, quod nam totam
          beatae assumenda ex!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, quos
          culpa! Facere voluptate repellendus error quibusdam omnis quis nulla
          nostrum necessitatibus ad ipsum eos quia rerum aliquid, reprehenderit
          sed amet.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
          voluptatibus et soluta velit amet voluptatem reprehenderit quae a,
          ipsa ad autem reiciendis ratione ea suscipit! Voluptas fugit alias
          quae adipisci?
        </p>
      </div>
    </div>

    <div class="box">
      <p class="text-h6">Your Locker</p>
      <div v-for="index in 0" :key="index">
        <component
          :is="step"
          :box="box"
          @decode="onDecoded"
          @back="onBack"
          @confirm="onConfirm"
          @rent="onRent"
        ></component>
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
  name: "IndexPage",
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

<style lang="scss" scoped>
.about {
  position: absolute;
  width: 100%;

  height: calc(
    100vh - (80px + 65px)
  ); // 100vh - (header height - footer height)px

  overflow-y: hidden;

  border-radius: 50px 50px 0px 0px;

  background: #1f2865;

  color: white;

  padding: 25px;
}
.box {
  position: absolute;
  bottom: 65px;

  padding: 25px;

  width: 100%;

  border-radius: 50px 50px 0px 0px;

  background: #eeecec;

  color: black;

  overflow-y: hidden;

  transition: max-height 0.15s ease-in-out;

  height: 100vh; // Hack transition

  max-height: 100px;

  &:hover {
    max-height: calc(
      100vh - (80px + 65px) - (45px + 25px)
    ); // 100vh - (header height - footer height)px
  }
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
