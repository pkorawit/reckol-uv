<template>
  <div class="detail">
    <div class="name text-h4 q-mb-xl">{{ locker.name }}</div>
    <div class="information q-pa-md q-mb-xl">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
      laboriosam error expedita, nesciunt repudiandae deserunt repellat mollitia
      facere architecto aperiam cupiditate ex animi debitis nemo neque ipsam
      obcaecati odio voluptate?
      <br />
      <br />
      See more. . .
    </div>
    <div class="action">
      <div v-if="!locker.fromOther" class="my-locker flex justify-around">
        <q-btn
          color="primary"
          label="unlock"
          outline
          to="/qr"
          class="my-locker-btn"
        />
        <q-btn
          color="primary"
          label="sent otp"
          outline
          @click="openSendOneTimeCodeDialog"
          class="my-locker-btn"
        />
      </div>
      <div v-if="locker.fromOther" class="from-other">
        <q-btn color="primary" label="unlock" outline to="/qr" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locker: {
        name: "S1",
        fromOther: false,
      },
    };
  },
  methods: {
    openSendOneTimeCodeDialog() {},
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: absolute;
  width: 100%;

  height: calc(
    100vh - (80px + 65px)
  ); // 100vh - (header height - footer height)px

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