<template>
  <q-page class="q-pa-sm">

    <q-card class="my-card q-mt-sm">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <q-card-actions align="right">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card>

    <q-card class="my-card q-mt-sm">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <q-card-actions align="right">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card>


    <q-card class="my-card q-mt-sm">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <q-card-actions align="right">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card>


    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <q-card-actions align="right">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card>

    <div class="row text-center q-ma-md">
      <div class="col text-h5">Locker L1</div>
      <div class="col">
        <q-btn color="primary" icon="check" label="Open" @click="openLocker('L1')" />
      </div>
      <div class="col">
        <q-btn color="secondary" icon="close" label="Close" @click="closeLocker('L1')" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {};
  },
  methods: {
    async openLocker(lockerId) {
      const url = `https://localhost:5001/locker/${lockerId}/open`;
      await this.$axios.get(url);
      console.log(`${lockerId} is opened`);
      
    },
    async closeLocker(lockerId) {
      const url = `https://localhost:5001/locker/${lockerId}/close`;
      await this.$axios.get(url);
      console.log(`${lockerId} is closed`);
    }
  }
};
</script>
