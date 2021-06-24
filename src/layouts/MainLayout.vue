<template>
  <q-layout class="layout">
    <Header class="header" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer class="footer" />
  </q-layout>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: { Header, Footer },
};
</script>
<style lang="scss" scoped>
.toolbar_logo {
  height: 30px;
  padding-top: 5px;
}
.layout {
  overflow-y: hidden;
  background-color: #F5F5F5;
}

.header {
  height: 10vh;
}
.footer {
  height: 5vh;
}
</style>
