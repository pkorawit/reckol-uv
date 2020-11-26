<template>
  <div class="background parent">
    <p class="text-h5">Account</p>
    <q-card class="card">
      <q-card-section>
        <div class="flex column  justify-between">
          <div class="row justify-center">
            <q-img
              class="bg-primary"
              style="height:180px; max-width: 180px;border-radius:50%"
            >
              <q-icon
                class="q-pa-xl"
                color="gray"
                name="fas fa-user-alt"
                size="90px"
              ></q-icon>
            </q-img>
          </div>
          <div>
            <q-input
              v-model="name"
              disable
              input-style="text-align:center"
            ></q-input>
          </div>
          <q-space />
          <div class=" q-pa-lg row justify-center " style="margin-top:25%">
            <q-btn outline color="negative"> sign out</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  mounted() {
    gsap.from(".parent", 1, {
      opacity: 0
    });
  },
  data() {
    return {
      name: "name naja"
    };
  }
};
</script>

<style lang="scss" scoped>
.parent {
  opacity: 1;
}
.background {
  position: absolute;
  width: 100%;

  height: calc(
    100vh - (80px + 65px)
  ); // 100vh - (header height - footer height)px

  overflow-y: hidden;

  border-radius: 50px 50px 0px 0px;

  background: #eeecec;

  padding: 25px;

  p {
    padding: 15px;
  }
}
.card {
  border-radius: 40px !important;
  height: calc(80vh - 142px);
}
</style>
