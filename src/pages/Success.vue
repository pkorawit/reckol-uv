<template>
  <div class="background">
    <div>
      <success title="Success" @completed="redirectToHome" />
    </div>
  </div>
</template>

<script>
import Success from "../components/Success";

export default {
  components: {
    Success,
  },
  methods: {
    redirectToHome() {
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
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
</style>
