<template>
  <div class="detail">
    <div class="name text-h4 q-mb-md">
      <q-icon color="negative" name="fas fa-cube" size="xl" />
      {{ lockerId }}
    </div>
    <div v-if="mode === MODE.RENTAL" class="information q-pa-md q-ma-md bg-white text-h6">
      <ul>
        <li>ฝากสัมภาระได้สูงสุด 1 วัน</li>
        <li>สัมภาระต้องสงสัยจะถูกตรวจสอบโดยไม่ต้องแจ้งให้ทางผู้ใช้บริการทราบล่วงหน้า</li>
        <li>ไม่อนุญาติให้ฝากหรือจัดเก็บ สัมภาระอันตราย หรือของผิดกฎหมายทุกชนิด</li>
        <li>ไม่รับผิดชอบต่อสัมภาระที่สูญหาย หรือสิ่งของมีค่าใดๆ ที่นำมาฝาก</li>
      </ul>
    </div>
    <div
      v-if="mode === MODE.SELF_UNLOCK"
      class="information q-pa-md q-mb-md q-ma-md"
    >
      <div class="row text-h6">
        <div class="col">
          <q-badge size="lg" align="middle" color="negative">
            Passcode
          </q-badge>
          {{ locker.masterCode }}
        </div>
      </div>
      <div class="row text-h6">
        <div class="col">
          <q-badge size="lg" align="middle" color="negative">
            Rent Time
          </q-badge>
          {{ new Date().toLocaleDateString() }} :
          {{ new Date().toLocaleTimeString() }}
        </div>
      </div>
      <p v-if="locker.sharing.isSharing">
        แชร์ไปยัง: {{ locker.sharing.targetPhoneNumber }}
      </p>
      <p v-if="locker.sharing.isSharing">
        รหัสการแชร์: {{ locker.onetimeCode }}
      </p>
    </div>
    <div v-if="mode === MODE.OTP_UNLOCK" class="information q-pa-md q-mb-xl">
      <p>ผู้แชร์: {{ locker.ownner }}</p>
      <p>รหัสผ่าน: {{ locker.onetimeCode }}</p>
    </div>
    <div class="action">
      <div v-if="mode === MODE.SELF_UNLOCK" class="my-locker">
        <div class="row q-ma-md">
          <div class="col">
            <q-btn
              unelevated
              icon="wb_iridescent"
              :disable="isDisable"
              :color="sterilizeBtnColor"
              label="sterilize"
              @click="sterilize"
              :class="sterilizeBtnClass"
            />
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="col">
            <q-btn
              unelevated
              icon="lock_open"
              :disable="isDisable"
              :color="actionBtnColor"
              label="unlock"
              :to="`/scanner?mode=${MODE.SELF_UNLOCK}&lockerId=${lockerId}`"
              :class="`${actionBtnClass}`"
            />
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="col">
            <q-btn
              v-if="!isSharing"
              icon="ios_share"
              :disable="isDisable"
              :color="actionBtnColor"
              label="share"
              unelevated
              @click="openSendOneTimeCodeDialog"
              :class="`${actionBtnClass}`"
            />
            <q-btn
              v-if="isSharing"
              :disable="isDisable"
              icon="cancel_presentation"
              color="negative"
              label="cancel share"
              unelevated
              @click="cancelShareLocker"
              style="font-size: 20px"
              :class="`${actionBtnClass}`"
            />
          </div>
        </div>
      </div>
      <div
        v-if="mode === MODE.OTP_UNLOCK"
        class="my-locker flex justify-around"
      >
        <q-btn
          :disable="isDisable"
          :color="actionBtnColor"
          label="unlock"
          outline
          :to="`/scanner?mode=${MODE.OTP_UNLOCK}&lockerId=${lockerId}`"
          :class="`${actionBtnClass}`"
        />
      </div>
      <div v-if="mode === MODE.RENTAL" class="my-locker flex justify-around q-ma-md">
        <q-btn
          :disable="isDisable"
          :color="actionBtnColor"
          label="Rent"
          icon="fas fa-check"
          unelevated
          :to="`/input-passcode?mode=${MODE.RENTAL}&lockerId=${lockerId}`"
          :class="`${actionBtnClass}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sendOneTimeCode, cancelShareLocker } from "src/api";
import { getLockerState } from "src/api/collections/locker-collection";
import { MODE } from "src/common/constant";
import { gsap } from "gsap";
import { sentSterilizeLockerCommand } from "src/api/collections/command-collection";
import { getSterilizeStatus } from "src/api/collections/sterilize-collection";
import {
  healthCheckState,
  startHealthCheckSubscription,
  onHealthChanges,
} from "src/api/collections/health-check";

export default {
  data() {
    return {
      locker: null,
      sterilizing: false,
      setting: null,
      isHealthy: false,
    };
  },
  methods: {
    async fetchLocker() {
      const locker = await getLockerState({
        lockerId: this.lockerId,
      });
      const sterilizeStatus = await getSterilizeStatus({
        lockerId: this.lockerId,
      });
      this.sterilizing = sterilizeStatus.data().sterilizeStatus;
      this.locker = {
        ...locker.data(),
        id: this.lockerId,
      };
    },
    openSendOneTimeCodeDialog() {
      this.$q
        .dialog({
          title: `Share [${ this.lockerId }]  to...`,
          message: "Input the phone number",
          prompt: {
            model: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk((target) => this.onOk(target))
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    async onOk(targetPhoneNumber) {
      const randomCode = () => Math.floor(100000 + Math.random() * 900000);
      const [error] = await sendOneTimeCode({
        lockerId: this.lockerId,
        onetimeCode: randomCode().toString(),
        targetPhoneNumber,
      });
      if (error) {
        return this.$q.dialog({
          title: "Error",
          message: "Can't share locker please contact operator.",
        });
      }
      await this.fetchLocker();
      this.onSent();
    },
    onSent() {
      this.$q.dialog({
        title: "Success",
        message: "Share locker success.",
      });
    },
    async sterilize() {
      const isConfirmed = confirm(`Sterilizesss?`);
      if (!isConfirmed) {
        return;
      }
      const userId = this.user.phoneNumber.replace("+66", "0");
      await sentSterilizeLockerCommand({
        lockerId: this.lockerId,
        userId,
      });
      return this.$router.push({
        path: `/`,
      });
    },
    async cancelShareLocker() {
      const isConfirmed = confirm(`Cancel share locker ${this.lockerId}`);
      if (!isConfirmed) {
        return;
      }
      await cancelShareLocker({ locker: this.locker });
      this.$q
        .dialog({
          title: "Success",
          message: "Share locker success.",
        })
        .onDismiss(() =>
          this.$router.push({
            path: `/`,
          })
        );
    },
  },
  computed: {
    mode() {
      return this.$route.query.mode;
    },
    lockerId() {
      return this.$route.query.lockerId;
    },
    MODE() {
      return MODE;
    },
    user() {
      return JSON.parse(localStorage.getItem("auth__user"));
    },
    isSterilizing() {
      return false;
      return this.sterilizing;
    },
    isActionable() {
      return true;
      if (this.isSterilizing) {
        return false;
      }

      if (!this.isHealthy) {
        return false;
      }

      return true;
    },
    isDisable() {
      return false;
      if (this.isSterilizing) {
        return true;
      }

      if (!this.isHealthy) {
        return true;
      }

      return false;
    },
    actionBtnClass() {
      return !this.isActionable
        ? `my-locker-btn disable-btn full-width`
        : `my-locker-btn full-width`;
    },
    sterilizeBtnClass() {
      return !this.isActionable
        ? `my-locker-sterilize-btn disable-btn`
        : `my-locker-sterilize-btn`;
    },
    actionBtnColor() {
      return !this.isActionable ? `grey` : `primary`;
    },
    sterilizeBtnColor() {
      return !this.isActionable ? `grey` : `deep-purple-9`;
    },
    isSharing() {
      return this.locker?.sharing?.isSharing;
    },
  },
  async mounted() {
    try {
      gsap.from(".detail", 1, {
        opacity: 0,
      });
      onHealthChanges((isHealthy) => (this.isHealthy = isHealthy));
      await startHealthCheckSubscription();
      await this.fetchLocker();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: absolute;
  width: 100%;

  height: calc(
    100vh - (80px + 65px)
  ); // 100vh - (header height - footer height)px

  overflow-y: hidden;

  // border-radius: 15px 15px 0px 0px;

  background: #f5f5f5;

  color: white;

  padding: 5px;
  opacity: 1;

  .name {
    color: $primary;
    height: 50px;
    width: 100%;
    text-align: center;
    background: $accent;
    border-radius: 30px;
  }

  .information {
    color: $primary;
    font-size: 15px;
    background: $accent;
    border-radius: 30px;
  }

  .action {
    .my-locker {
      .my-locker-btn {
        width: 45%;
        height: 75px;
        font-size: 30px;
        border-radius: 25px;
      }
      .my-locker-sterilize-btn {
        width: 100%;
        height: 75px;
        font-size: 30px;
        border-radius: 25px;
      }
      .disable-btn {
        color: grey;
      }
    }
  }
}
</style>
