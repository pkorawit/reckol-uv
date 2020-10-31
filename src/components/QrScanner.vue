<template>
  <div>
    <qrcode-stream @decode="onDecode"> </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream
  },
  methods: {
    onDecode(code) {
      this.$emit("decoded", code);
    }
  }
};
</script>

<style></style>
