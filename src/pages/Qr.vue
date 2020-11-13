<template>
<div class="background">
    <div>
        <qrcode-stream @decode="onDecode" class="qr-scanner"> </qrcode-stream>
    </div>
</div>
</template>

<script>
import {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
} from "vue-qrcode-reader";
import {
    SCANNER_MODE
} from "../common/constant";

export default {
    components: {
        QrcodeStream,
    },
    computed: {
        mode() {
            return this.$route.query.mode;
        },
    },
    methods: {
        onDecode(lockerId) {
            this.$router.push({
                path: `/input-passcode?mode=${this.mode}&lockerId=${lockerId}`,
            });
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
