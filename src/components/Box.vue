<template>
  <div class="">
    <q-card class="q-pa-md">
      <q-card-section class="bg-blue row text-center">
        <div class="col-6">
          <div class="small-title q-mb-md">Locker Nuumber</div>
          <div class="text-h2">{{ box.number }}</div>
        </div>
        <div class="col-6">
          <div class="small-title q-mb-md">Status</div>
          <div class="text-h4" style="padding-top: 10px">{{ box.status }}</div>
        </div>
        <div class="col-12 q-mt-md">
          <div class="text-left">Price</div>
          <q-btn
            class="full-width"
            color="grey-1"
            text-color="black"
            label="Free"
            disable
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div class="col-12 q-mt-md">
          <q-btn
            class="full-width"
            color="blue-3"
            text-color="black"
            label="Rent this box"
            @click="rent"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    box: {
      /**
       * {
       *    id:string
       *
       *    number: string
       *
       *    status: string
       *
       *    price: number
       * }
       */
      type: Object,
      required: true,
    },
  },
  methods: {
    rent() {
      this.$emit("rent");
    },
  },
};
</script>

<style scoped>
.small-title {
  font-size: 18px;
}
</style>>