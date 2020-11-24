<template>
  <div class="background">
    <div>
      <qrcode-stream @decode="onDecode" class="qr-scanner"> </qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { MODE } from "../common/constant";

export default {
  components: {
    QrcodeStream,
  },
  computed: {
    mode() {
      return this.$route.query.mode;
    },
    lockerId() {
      return this.$route.query.lockerId;
    },
  },
  methods: {
    onDecode(lockerId) {
      lockerId = "S2"; //mock
      if (this.mode === MODE.RENTAL) {
        this.$router.push({
          path: `/detail?mode=${this.mode}&lockerId=${lockerId}`,
        });
      }
      if (this.mode === MODE.SELF_UNLOCK) {
        this.$router.push({
          path: `/input-passcode?mode=${this.mode}&lockerId=${lockerId}`,
        });
      }
      if (this.mode === MODE.OTP_UNLOCK) {
        this.$router.push({
          path: `/input-passcode?mode=${this.mode}&lockerId=${lockerId}`,
        });
      }
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

  height: calc(100vh - (80px + 65px));

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
