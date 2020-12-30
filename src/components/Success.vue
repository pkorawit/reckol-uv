<template>
  <div>
    <div>
      <p class="text-h6 title">{{ title }}</p>
    </div>
    <div class="row justify-center q-mt-xl">
      <check-mark :isCompleted="isCompleted" class="shadow"></check-mark>
    </div>
  </div>
</template>

<script>
import CheckMark from "./CheckMark";
export default {
  props: {
    title: String,
  },
  components: {
    CheckMark,
  },
  data() {
    return {
      isCompleted: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isCompleted = true;
      this.$emit("completed");
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 15px;
}
.card {
  margin: 50px;
  border-radius: 16px;
}
.shadow {
  filter: drop-shadow(1px 1px 1px $primary);
}
</style>
