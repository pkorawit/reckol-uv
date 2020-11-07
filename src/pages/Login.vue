<template>
  <div class="column justify-center items-center page">
    <div class="absolute text">
      <p class="text-h4 product-name">uvbox</p>
    </div>
    <div class="absolute input">
      <q-input
        dark
        hint="ex. 0##-###-####"
        mask="###-###-####"
        v-model="tel"
      ></q-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
    };
  },
  watch: {
    tel(oldVal, newVal) {
      localStorage.setItem("isLogin", true);
      oldVal.length == 12 ? this.$router.push("/") : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text {
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -350%);
}
.product-name {
  text-transform: uppercase;
  color: white;
}
.page {
  height: 100vh;
  background-color: #1f2865;
}
</style>
