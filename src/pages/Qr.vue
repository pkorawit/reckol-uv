<template>
  <div class="background">
    <div v-if="isQr">
      <p class="text-h6">{{ step }}</p>

      <qrcode-stream @decode="onDecode" class="qr-scanner"> </qrcode-stream>
    </div>

    <div v-else-if="isSetPassword">
      <password-form :title="step" @confirmPassword="confirmPassword" />
    </div>

    <div v-else-if="isSuccess">
      <success :title="step" />
    </div>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import PasswordForm from "../components/PasswordForm";
import Success from "../components/Success";
export default {
  components: {
    QrcodeStream,
    PasswordForm,
    Success,
  },
  data() {
    return {
      decode: false,
      passwordSet: false,
    };
  },
  computed: {
    isQr() {
      return !this.decode;
    },
    isSetPassword() {
      return this.decode && !this.passwordSet;
    },
    isSuccess() {
      return this.decode && this.passwordSet;
    },
    step() {
      let step = "";

      if (this.isQr) {
        step = "Qr Scanner";
      }

      if (this.isSetPassword) {
        step = "Set Password";
      }

      if (this.isSuccess) {
        step = "Success";
      }

      return step;
    },
  },
  methods: {
    onDecode(code) {
      this.decode = true;
    },
    confirmPassword(val) {
      console.log(val);
      this.passwordSet = val;
    },
  },
  mounted() {
    setTimeout(() => {
      this.onDecode("");
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;

  height: calc(
    100vh - (80px + 65px)
  ); // 100vh - (header height - footer height)px

  overflow-y: hidden;

  border-radius: 50px 50px 0px 0px;

  background: #eeecec;

  padding: 25px;

  p {
    padding: 15px;
  }
}
.qr-scanner {
  width: 100%;
  height: calc(100vh - (80px + 65px) - (62px + 25px));
  padding-bottom: 50px;
}
</style>
