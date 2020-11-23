<template>
  <q-header class="bg-white text-black column header">
    <div class="row">
      <div class="text-h4 text-left project-name">Rekcol UV</div>
      <div class="text-h5 info">
        <q-icon name="info" size="42px">
          <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse
              saepe non aperiam? Nam, assumenda? Eos qui porro ipsam debitis,
              quo, id minima distinctio illo, exercitationem illum nesciunt cum
              obcaecati?
            </p>
          </q-tooltip>
        </q-icon>
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
  // text-transform: uppercase;
}

.header {
  min-height: 80px;
  max-height: 80px;
  padding: 25px;
}
</style>
