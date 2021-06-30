<template>
  <div class="detail">
    <div class="name text-h4 q-mb-md">
      <q-icon color="negative" name="fas fa-cube" size="xl" />
      {{ lockerId }}
    </div>
    <div
      v-if="mode === MODE.RENTAL"
      class="information q-pa-md q-ma-md bg-white text-h6"
    >
      <ul>
        <li>ฝากสัมภาระได้สูงสุด 1 วัน</li>
        <li>
          สัมภาระต้องสงสัยจะถูกตรวจสอบโดยไม่ต้องแจ้งให้ทางผู้ใช้บริการทราบล่วงหน้า
        </li>
        <li>
          ไม่อนุญาติให้ฝากหรือจัดเก็บ สัมภาระอันตราย หรือของผิดกฎหมายทุกชนิด
        </li>
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
      <div
        v-if="locker.sharing.isSharing"
        style="border-radius: 15px"
        class="bg-grey-3 q-mt-sm q-pa-sm"
      >
        <div class="row text-h6">
          <div class="col">
            <q-badge size="lg" align="middle" color="secondary">
              Shared to
            </q-badge>
            {{ locker.sharing.targetPhoneNumber }}
          </div>
          <div class="col text-right">
            <q-btn
              flat
              color="primary"
              icon="content_copy"
              label=""
              @click="copyShareInfo"
            />
          </div>
        </div>
        <div class="row text-h6">
          <div class="col">
            <q-badge size="lg" align="middle" color="secondary">
              One-time passcode
            </q-badge>
            {{ locker.onetimeCode }}
          </div>
        </div>
      </div>
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
              label="uv sterilize"
              @click="confirmSterilize"
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
              @click="confirmCancelShare = true"
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
      <div
        v-if="mode === MODE.RENTAL"
        class="my-locker flex justify-around q-ma-md"
      >
        <q-btn
          :disable="isDisable"
          :color="actionBtnColor"
          label="Rent"
          icon="fact_check"
          unelevated
          :to="`/input-passcode?mode=${MODE.RENTAL}&lockerId=${lockerId}`"
          :class="`${actionBtnClass}`"
        />
      </div>
    </div>
    <q-dialog v-model="confirmCancelShare" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="cancel_presentation"
            color="negative"
            text-color="white"
          />
          <span class="q-ml-sm"
            >Confirm to cancel share locker {{ this.lockerId }} ?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Confirm"
            color="primary"
            @click="cancelShareLocker"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="wb_iridescent"
            color="deep-purple-9"
            text-color="white"
          />
          <span class="q-ml-sm"
            >The sterilization will take about 10 minutes.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Start"
            color="primary"
            @click="sterilize"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { copyToClipboard } from "quasar";

export default {
  data() {
    return {
      locker: null,
      sterilizing: false,
      setting: null,
      isHealthy: false,
      confirm: false,
      confirmCancelShare: false,
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
    copyShareInfo() {
      const shareInfo = `Locker No: ${this.lockerId}\nPasscode: ${this.locker.onetimeCode}\n`;
      copyToClipboard(shareInfo);
    },
    openSendOneTimeCodeDialog() {
      this.$q
        .dialog({
          title: `Share [${this.lockerId}]  to...`,
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
      this.onSent(targetPhoneNumber);
    },
    onSent() {
      this.$q.dialog({
        title: "Success",
        message: `The locker has shared to ${targetPhoneNumber}`,
      });
    },
    confirmSterilize() {
      this.confirm = true;
    },
    async sterilize() {
      console.log("Start sterilize");
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
      await cancelShareLocker({ locker: this.locker });
      this.$router.push({
        path: `/`,
      });
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
      return this.sterilizing;
    },
    isActionable() {
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
