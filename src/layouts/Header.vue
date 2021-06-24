<template>
  <q-header class="bg-gray-custom text-black column header">
    <div class="row">
      <div class="text-h4 text-left project-name">
        <img alt="logo" src="~assets/uvbox2.png" width="50%" />
      </div>
      <div class="text-h5 info">
        <q-icon color="primary" name="info" size="42px"> </q-icon>
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

.header {
  min-height: 80px;
  max-height: 80px;
  padding: 25px;
}

.bg-gray-custom {
  background-color: #F5F5F5;  
}
</style>
