<template>
  <q-header class="bg-white text-black column header">
    <div class="row">
      <div class="text-h4 text-left project-name">uvbox</div>
      <div class="text-h5 info">
        <q-icon name="info" size="42px"></q-icon>
      </div>
    </div>
  </q-header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.info {
  margin: 0px 0px 0px auto;
  cursor: pointer;
}
.project-name {
  text-transform: uppercase;
}
.header {
  min-height: 80px;
  max-height: 80px;
  padding: 25px;
}
</style>
