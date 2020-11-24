<template>
  <div class="detail">
    <div class="name text-h4 q-mb-xl">{{ locker.id }}</div>
    <div class="information q-pa-md q-mb-xl">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus laboriosam error expedita, nesciunt repudiandae deserunt repellat mollitia facere architecto aperiam cupiditate ex animi debitis nemo neque ipsam obcaecati odio voluptate?
      <br />
      <br />
      See more. . .
    </div>
    <div class="action">
      <div v-if="mode === MODE.SELF_UNLOCK" class="my-locker flex justify-around">
        <q-btn color="primary" label="unlock" outline :to="`/scanner?mode=${MODE.SELF_UNLOCK}&lockerId=${lockerId}`" class="my-locker-btn" />
        <q-btn color="primary" label="share locker" outline @click="openSendOneTimeCodeDialog" class="my-locker-btn" />
      </div>
      <div v-if="mode === MODE.OTP_UNLOCK" class="my-locker flex justify-around">
        <q-btn color="primary" label="unlock" outline :to="`/scanner?mode=${MODE.OTP_UNLOCK}&lockerId=${lockerId}`" class="my-locker-btn" />
      </div>
      <div v-if="mode === MODE.RENTAL" class="my-locker flex justify-around">
        <q-btn color="primary" label="Rent" outline :to="`/input-passcode?mode=${MODE.RENTAL}&lockerId=${lockerId}`" class="my-locker-btn" />
      </div>
    </div>
  </div>
</template>

<script>
import { sendOneTimeCode } from "src/api";
import { getLockerState } from "src/api/collections/locker-collection";
import { MODE } from "src/common/constant";

export default {
  data() {
    return {
      locker: {
        id: "S1",
        price: "FREE",
      },
    };
  },
  methods: {
    openSendOneTimeCodeDialog() {
      this.$q
        .dialog({
          title: "Prompt",
          message: "Input target phone number.",
          prompt: {
            model: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk((target) => this.onOk(target))
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    async onOk(targetPhoneNumber) {
      const randomCode = () => Math.round(Math.random() * 100000);
      await sendOneTimeCode({
        lockerId: this.lockerId,
        onetimeCode: randomCode().toString(),
        targetPhoneNumber,
      });
      this.onSent();
    },
    onSent() {
      this.$q.dialog({
        title: "Success",
        message: "OTP Sent",
      });
    },
  },
  computed: {
    mode() {
      return this.$route.query.mode;
    },
    lockerId() {
      return this.$route.query.lockerId;
    },
    MODE() {
      return MODE;
    },
  },
  async mounted() {
    const locker = await getLockerState({
      lockerId: this.lockerId,
    });
    this.locker = locker;
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: absolute;
  width: 100%;

  height: calc(100vh - (80px + 65px)); // 100vh - (header height - footer height)px

  overflow-y: hidden;

  border-radius: 50px 50px 0px 0px;

  background: #f5f5f5;

  color: white;

  padding: 25px;

  .name {
    color: white;
    height: 50px;
    width: 100%;
    text-align: center;
    background: $primary;
    border-radius: 40px;
  }

  .information {
    color: white;
    font-size: 15px;
    background: $primary;
    border-radius: 25px;
  }

  .action {
    .my-locker {
      .my-locker-btn {
        width: 150px;
        height: 150px;
        font-size: 30px;
        border-radius: 25px;
      }
    }
  }
}
</style>
