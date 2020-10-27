<template>
  <q-layout class="layout">
    <Header class="header" />
    <q-page-container>
      <q-card class="main-content">
        <q-card-section>
          <div>
            <router-view />
          </div>
        </q-card-section>
      </q-card>
    </q-page-container>
    <Footer class="footer" />
  </q-layout>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: { Header, Footer }
};
</script>
<style lang="scss" scoped>
.toolbar_logo {
  height: 30px;
  padding-top: 5px;
}
.layout {
  overflow-y: hidden;
}
.main-content {
  position: fixed;
  height: 85vh;
  width: 100%;
  overflow-y: hidden;
  // margin-top: 50px 0px 30px;
  border-radius: 50px 50px 0px 0px;
  background: rgb(60, 63, 201);
}
.header {
  height: 10vh;
}
.footer {
  height: 5vh;
}
</style>
