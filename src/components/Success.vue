<template>
  <div>
    <div>
      <p class="text-h6 title">{{ title }}</p>
    </div>
    <div>
      <q-card class="card">
        <q-card-section>
          <p>mark</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="scss" scoped>
.title {
  padding: 15px;
}
.card {
  margin: 50px;
}
</style>
