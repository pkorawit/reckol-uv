<template>
  <div class="background">
    <div>
      <password-form title="Passcode" @confirmPassword="confirmPassword" />
    </div>
  </div>
</template>

<script>
import { MODE } from "src/common/constant";
import PasswordForm from "../components/PasswordForm";
import { rentLocker, unlockOneTimeLocker, unlockSelfLocker } from "src/api";
import { Dialog, Loading } from "quasar";
import { gsap } from "gsap";
export default {
  components: {
    PasswordForm,
  },
  mounted() {
    gsap.from(".background", 1, {
      opacity: 0,
    });
  },
  computed: {
    mode() {
      return this.$route.query.mode;
    },
    lockerId() {
      return this.$route.query.lockerId;
    },
    user() {
      return JSON.parse(localStorage.getItem("auth__user"));
    },
  },
  methods: {
    async confirmPassword(passcode) {
      try {
        Loading.show();
        let isSucceed = false;
        const userId = this.user.phoneNumber.replace("+66", "0");

        if (this.mode == MODE.RENTAL) {
          isSucceed = await rentLocker({
            lockerId: this.lockerId,
            passcode,
            userId: userId,
          });
        }

        if (this.mode == MODE.SELF_UNLOCK) {
          isSucceed = await unlockSelfLocker({
            lockerId: this.lockerId,
            passcode,
            userId: userId,
          });
        }

        if (this.mode == MODE.OTP_UNLOCK) {
          isSucceed = await unlockOneTimeLocker({
            lockerId: this.lockerId,
            passcode,
            userId: userId,
          });
        }

        Loading.hide();

        if (!isSucceed) {
          return Dialog.create({
            title: "Warning",
            message: "Invalid Passcode",
          });
        }

        this.$router.push({
          path: `/success`,
        });
      } catch (error) {
        console.error(error);
        Loading.hide();
        this.$q
          .dialog({
            title: "Alert",
            message: "Something went wrong.",
          })
          .onDismiss(() => {
            this.$router.resolve("/");
          });
      }
    },
  },
};
</script>

<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.background {
  position: absolute;
  width: 100%;

  height: calc(100vh - (80px + 65px));

  overflow-y: hidden;

  border-radius: 50px 50px 0px 0px;

  background: #eeecec;

  opacity: 1;

  padding: 25px;

  p {
    padding: 15px;
  }
}
</style>
