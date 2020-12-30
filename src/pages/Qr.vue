<template>
  <div class="background">
    <div v-if="loading" class="loading">
      <q-spinner class="spinner" color="primary" size="3em" />
    </div>
    <div>
      <qrcode-stream @decode="onDecode" @init="onInit" class="qr-scanner">
      </qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { Dialog, Loading } from "quasar";
import { MODE } from "../common/constant";
import { getLockerState } from "src/api/collections/locker-collection";

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
    async onDecode(lockerId) {
      lockerId = "S2"; //mock
      if (this.mode === MODE.RENTAL) {
        const lockerState = await getLockerState({ lockerId });
        if (lockerState.data().status === "occupied") {
          Dialog.create({
            title: "Warning",
            message: "Locker not available",
          });
          return this.$router.push({
            path: `/`,
          });
        }
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
    async onInit(promise) {
      // show loading indicator

      try {
        const { capabilities } = await promise;

        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          // user denied camera access permisson
        } else if (error.name === "NotFoundError") {
          // no suitable camera device installed
        } else if (error.name === "NotSupportedError") {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === "NotReadableError") {
          // maybe camera is already in use
        } else if (error.name === "OverconstrainedError") {
          // did you requested the front camera although there is none?
        } else if (error.name === "StreamApiNotSupportedError") {
          // browser seems to be lacking features
        }
      } finally {
        // hide loading indicator
        // console.log("camera is ready");
        this.loading = false;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      // this.loading = false;
      this.onDecode("");
    }, 3000);
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
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
