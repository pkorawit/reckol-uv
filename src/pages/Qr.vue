<template>
  <div class="bg">
    <!-- <qr-scanner class="absolute-center bg-blue-5" /> -->
    <div v-if="!decode">
      <p class="text-h6">
        Qr Scanner
      </p>
      <div class=" absolute-center bg-grey-5 cam">
        <qrcode-stream @decode="onDecode"> </qrcode-stream>
      </div>
    </div>
    <div v-else-if="decode && !passwordSet">
      <password-form title="Set Password" @confirmPassword="confirmPassword" />
    </div>
    <div v-else-if="decode && passwordSet">
      <success title="Success" />
    </div>
  </div>
</template>

<script>
// import QrScanner from "../components/QrScanner";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import PasswordForm from "../components/PasswordForm";
import Success from "../components/Success";
export default {
  components: {
    // QrScanner,
    QrcodeStream,
    PasswordForm,
    Success
  },
  data() {
    return {
      decode: true,
      passwordSet: false
    };
  },
  methods: {
    onDecode(code) {
      // alert(code);
      // Notify.create(code);
      this.decode = true;
      // this.$store.dispatch("rental/getBox", boxId);
    },
    confirmPassword(val) {
      console.log(val);
      this.passwordSet = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  height: 85vh;
  width: 100%;
  left: 0;
  top: 9.8vh;
  overflow-y: hidden;
  // margin-top: 50px 0px 30px;
  border-radius: 50px 50px 0px 0px;
  //   background: #1f2865;
  background: #eeecec;

  p {
    padding: 15px;
  }
}
.cam {
  width: 70vw;
  height: 40vh;
}
</style>
