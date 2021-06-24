<template>
  <div class="column parent">
    <div class="about">
      <div>
        <p class="text-h6">My Box</p>
        <div>
          <div v-if="myLockers.length > 0">
            <div
              v-for="locker in myLockers"
              :key="locker.id"
            >
              <locker-list-item
                :locker="locker"
                class="q-py-xs"
              ></locker-list-item>
            </div>
          </div>
          <div
            v-else
            class="column justify-center items-center"
          >
            <p class="text-h4 text-none">None</p>
          </div>
        </div>
      </div>
    </div>

    <div :class="shareLockerClass">
      <p class="text-h6">Shared Box</p>
      <q-scroll-area
        :delay="1500"
        class="scroll-area"
      >
        <div v-if="shareLockers.length > 0">
          <div
            v-for="locker in shareLockers"
            :key="locker.id"
          >
            <locker-list-item
              :locker="locker"
              class="q-py-xs"
              :isShareLocker="true"
            ></locker-list-item>
          </div>
        </div>
        <div
          v-else
          class="column justify-center items-center"
        >
          <p class="text-h4 text-none">None</p>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import LockerListItem from "../components/LockerListItem.vue";
import { QrcodeStream } from "vue-qrcode-reader";
import PasswordForm from "../components/PasswordForm.vue";
import { getUserLockersView } from "src/api";
import { gsap } from "gsap";
import { healthCheckState, startHealthCheckSubscription } from 'src/api/collections/health-check';

export default {
  name: "IndexPage",
  components: {
    QrcodeStream,
    LockerListItem,
    PasswordForm
  },
  mounted() {
    gsap.to(".parent", 1, {
      opacity: 0,
      x: 500
    });

  },
  data() {
    return {
      myLockers: [],
      shareLockers: []
    };
  },
  computed: {
    shareLockerClass() {
      const shareLockersBoxExists = !!this.shareLockers;
      return shareLockersBoxExists ? "box" : "no-box";
    },
    user() {
      return JSON.parse(localStorage.getItem("auth__user"));
    },
    isHealthy() {
      return healthCheckState.isHealthy
    },
  },
  async mounted() {
    const userLockers = await getUserLockersView({ userId: this.user.uid });
    this.myLockers = userLockers.myLockers;
    this.shareLockers = userLockers.shareLockers;
  }
};
</script>

<style lang="scss" scoped>
.parent {
  opacity: 1;
}
.scroll-area {
  height: 100%;
}

.about {
  position: absolute;
  width: 100%;

  height: calc(
    100vh - (80px + 65px)
  ); // 100vh - (header height - footer height)px

  overflow-y: scroll;

  border-radius: 50px 50px 0px 0px;

  background: #1D959E;

  color: white;

  padding: 25px;
}

.box {
  position: absolute;
  bottom: 65px;

  padding: 25px;

  width: 100%;

  border-radius: 50px 50px 0px 0px;

  background: #33C0CA;

  color: white;

  overflow-y: hidden;

  transition: max-height 0.15s ease-in-out;

  height: 100vh; // Hack transition

  max-height: 200px;

  &:hover {
    max-height: calc(
      100vh - (80px + 65px) - (45px + 25px)
    ); // 100vh - (header height - footer height)px
  }
}

.no-box {
  position: absolute;
  bottom: 65px;

  padding: 25px;

  width: 100%;

  border-radius: 50px 50px 0px 0px;

  background: #33C0CA;

  color: black;

  overflow-y: hidden;

  transition: max-height 0.15s ease-in-out;

  height: 100vh; // Hack transition

  max-height: 100px;

  &:hover {
    max-height: calc(
      100vh - (80px + 65px) - (45px + 25px)
    ); // 100vh - (header height - footer height)px
  }
}

.text-none {
  position: absolute;
  color: #F5F5F5;
  // top: 50%;
  transform: translate(0%, 380%);

  @media (max-width: 320px) {
    transform: translate(0%, 280%);
  }
}
</style>
