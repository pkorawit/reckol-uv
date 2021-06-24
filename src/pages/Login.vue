<template>
  <div class="column justify-center items-center page">
    <div
      class="absolute input"
      v-if="mode === 'PHONE_INPUT'"
    >
    <div class="text-center"><img alt="logo" src="~assets/coc_logo.png" width="40%" /></div>    
    <div class="text-center q-mt-md"><img alt="logo" src="~assets/uvbox.png" width="70%" /></div>          
      <q-input
        type="text"
        mask="(###) ### - ####"
        hint="ex. (098)-xxx-xxxx"
        v-model="tel"
        input-style="text-align:center;"
        color="secondary"
        label="กรอกเบอร์โทรศัพท์เพื่อรับ OTP"
        autofocus
      ></q-input>
      <q-btn
        color="secondary"
        label="next"
        class="full-width q-mt-md"
        @click="renderRecaptcha"
        :loading="loading"
      />
      <div
        class="q-pt-xl"
        id="recaptcha-container"
      ></div>
    </div>
    <div
      class="absolute input"
      v-if="mode === 'OTP_INPUT'"
    > 
    <div class="text-center"><img alt="logo" src="~assets/coc_logo.png" width="40%" /></div>    
    <div class="text-center q-mt-md"><img alt="logo" src="~assets/uvbox.png" width="70%" /></div>    
      <q-input
        type="number"
        hint="ex. xxxxxx"
        v-model="otp"
        input-style="text-align:center;"
        color="secondary"
        label="กรอก OTP ที่ได้รับ"
        autofocus
      ></q-input>
      <q-btn
        color="secondary"
        label="Sign In"
        class="full-width q-mt-md"
        @click="confirmOTP"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { Loading } from "quasar";
import { createUserLockers } from "../api/collections/user-lockers-collection";
import { createUserProfiles } from "../api/collections/user-profiles-collection";

export default {
  data() {
    return {
      tel: "",
      otp: "",
      recaptchaVerifier: null,
      mode: "PHONE_INPUT",
      confirmationResult: null,
      loading: false
    };
  },
  methods: {
    async onLogin(response) {
      try {
        const formatTel = `+66${this.tel.replace("(","").replace(")","").replace("-","").replaceAll(" ","").slice(1,10)}`;    
        Loading.show();
        this.confirmationResult = await this.$auth().signInWithPhoneNumber(
          formatTel,
          this.recaptchaVerifier
        );
        this.mode = "OTP_INPUT";
        Loading.hide();
      } catch (error) {
        console.error(error);
      }
    },
    async confirmOTP() {
      try {
        this.loading = true
        Loading.show();
        const result = await this.confirmationResult.confirm(this.otp);

        if (result.additionalUserInfo.isNewUser) {
          await Promise.all([
            createUserLockers({
              userId: result.user.uid,
              phoneNumber: this.tel,
            }),
            createUserProfiles({
              userId: result.user.uid,
              phoneNumber: this.tel,
            }),
          ]);
        }

        localStorage.setItem("auth__user", JSON.stringify(result.user));
        Loading.hide();
        this.$router.push("/");
        this.loading = false
      } catch (error) {
        console.error(error);
        window.location.reload();
      }
    },
    renderRecaptcha() {
      this.loading = true
      this.recaptchaVerifier.render();
      setTimeout(() => {
        this.loading = false
      }, 3000);
    }
  },
  watch: {
    // tel(val, newVal) {
    //   if (val.length == 10) {
    //     this.recaptchaVerifier.render();
    //   }
    // },
    // otp(val, newVal) {
    //   if (val.length == 6) {
    //     this.confirmOTP();
    //   }
    // },
  },
  mounted() {
    this.recaptchaVerifier = new this.$auth.RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: (response) => this.onLogin(response),
      "expired-callback": function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 100px);
}

.text {
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -350%);
}

.product-name {
  text-transform: uppercase;
  color: #1D959E;
}

.page {
  height: 100vh;
  background-color: #F5F5F5;
}
</style>
