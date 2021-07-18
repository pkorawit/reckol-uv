<template>
  <div>
    <q-card flat bordered class="locker" @click="detail">
      <div class="row">
        <div class="col q-ma-md text-h5"><q-icon color="negative" name="fas fa-cube" size="lg" /> {{ locker.id }}</div>
        <div class="col q-ma-md text-right"><q-btn unelevated rounded class="bg-grey-3" text-color="negative" @click="detail">View Detail</q-btn></div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { MODE } from "../common/constant";

export default {
  props: {
    locker: {
      type: Object,
    },
    isShareLocker: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    detail() {
      const path = `/detail?mode=${this.mode}&lockerId=${this.locker?.id}`
      if (this.$route.path !== path) this.$router.push(path)
    },
  },
  computed: {
    mode() {
      return this.isShareLocker ? MODE.OTP_UNLOCK : MODE.SELF_UNLOCK;
    },
  },
};
</script>

<style lang="scss" scoped>
.small-title {
  font-size: 18px;
  margin-left: 10px;
}

.locker {
  background: white;
  border-radius: 20px;
  color: $primary;
  font-weight: 500;
}

.status-btn {
  background: #1f2865;
  color: white;
  padding: 10px;
  border-radius: 20px;
}
</style>
