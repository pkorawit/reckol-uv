<template>
  <qrcode-stream @decode="onDecode"> </qrcode-stream>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream,
  },
  methods: {
    onDecode(code) {
      this.$emit("decoded", code);
    },
  },
};
</script>

<style>
</style>